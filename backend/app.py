#!/usr/bin/env python3
"""
Image Storage Backend API
Handles image upload, validation, and metadata management
"""

import os
import json
import logging
import sqlite3
import uuid
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from pathlib import Path
import mimetypes
from io import BytesIO

# Try to import Pillow for image validation
try:
    from PIL import Image
    PILLOW_AVAILABLE = True
except ImportError:
    PILLOW_AVAILABLE = False
    print("WARNING: Pillow not available. Image validation will be limited.")

# Configuration
IMAGES_DIR = Path("/images")
LOGS_DIR = Path("/logs")
LOG_FILE = LOGS_DIR / "app.log"
DB_FILE = LOGS_DIR / "metadata.db"
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif'}
ALLOWED_MIME_TYPES = {'image/jpeg', 'image/png', 'image/gif'}
PORT = 8000

# Ensure directories exist
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
LOGS_DIR.mkdir(parents=True, exist_ok=True)

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s: %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE, encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class DatabaseManager:
    """Manages SQLite database for image metadata"""
    
    def __init__(self, db_path):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize database schema"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS images (
                id TEXT PRIMARY KEY,
                original_filename TEXT NOT NULL,
                stored_filename TEXT NOT NULL,
                file_size INTEGER NOT NULL,
                mime_type TEXT NOT NULL,
                width INTEGER,
                height INTEGER,
                upload_date TEXT NOT NULL,
                url TEXT NOT NULL
            )
        ''')
        conn.commit()
        conn.close()
        logger.info("Database initialized successfully")
    
    def save_metadata(self, metadata):
        """Save image metadata to database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO images (id, original_filename, stored_filename, file_size, 
                              mime_type, width, height, upload_date, url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            metadata['id'],
            metadata['original_filename'],
            metadata['stored_filename'],
            metadata['file_size'],
            metadata['mime_type'],
            metadata.get('width'),
            metadata.get('height'),
            metadata['upload_date'],
            metadata['url']
        ))
        conn.commit()
        conn.close()
    
    def get_metadata(self, image_id):
        """Get metadata for a specific image"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM images WHERE id = ?', (image_id,))
        row = cursor.fetchone()
        conn.close()
        
        if row:
            return {
                'id': row[0],
                'original_filename': row[1],
                'stored_filename': row[2],
                'file_size': row[3],
                'mime_type': row[4],
                'width': row[5],
                'height': row[6],
                'upload_date': row[7],
                'url': row[8]
            }
        return None
    
    def get_all_metadata(self, limit=100):
        """Get metadata for all images"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM images ORDER BY upload_date DESC LIMIT ?', (limit,))
        rows = cursor.fetchall()
        conn.close()
        
        return [{
            'id': row[0],
            'original_filename': row[1],
            'stored_filename': row[2],
            'file_size': row[3],
            'mime_type': row[4],
            'width': row[5],
            'height': row[6],
            'upload_date': row[7],
            'url': row[8]
        } for row in rows]


# Initialize database
db = DatabaseManager(DB_FILE)


class ImageUploadHandler(BaseHTTPRequestHandler):
    """HTTP Request Handler for image upload API"""
    
    def _set_headers(self, status_code=200, content_type='application/json'):
        """Set response headers with CORS"""
        self.send_response(status_code)
        self.send_header('Content-Type', content_type)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def _send_json(self, data, status_code=200):
        """Send JSON response"""
        self._set_headers(status_code)
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
    
    def _send_error_response(self, message, status_code=400):
        """Send error response"""
        logger.error(f"Error: {message}")
        self._send_json({'success': False, 'error': message}, status_code)
    
    def do_OPTIONS(self):
        """Handle preflight CORS requests"""
        self._set_headers(204)
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        
        # Health check endpoint
        if parsed_path.path == '/health':
            self._send_json({'status': 'healthy', 'service': 'image-storage-api'})
            return
        
        # Get all images metadata
        if parsed_path.path == '/images':
            try:
                images = db.get_all_metadata()
                self._send_json({'success': True, 'images': images})
            except Exception as e:
                logger.error(f"Error fetching images: {str(e)}")
                self._send_error_response(f"Internal server error: {str(e)}", 500)
            return
        
        # Get specific image metadata
        if parsed_path.path.startswith('/image/'):
            image_id = parsed_path.path.split('/')[-1]
            metadata = db.get_metadata(image_id)
            if metadata:
                self._send_json({'success': True, 'image': metadata})
            else:
                self._send_error_response('Image not found', 404)
            return
        
        self._send_error_response('Endpoint not found', 404)
    
    def do_POST(self):
        """Handle POST requests - file upload"""
        if self.path != '/upload':
            self._send_error_response('Invalid endpoint', 404)
            return
        
        try:
            # Parse multipart form data
            content_type = self.headers.get('Content-Type', '')
            
            if 'multipart/form-data' not in content_type:
                self._send_error_response('Content-Type must be multipart/form-data')
                return
            
            # Extract boundary
            boundary = content_type.split('boundary=')[-1].encode()
            
            # Read content
            content_length = int(self.headers.get('Content-Length', 0))
            
            if content_length > MAX_FILE_SIZE:
                self._send_error_response(f'File size exceeds {MAX_FILE_SIZE / (1024*1024):.1f} MB limit')
                return
            
            body = self.rfile.read(content_length)
            
            # Parse multipart data
            file_data, filename = self._parse_multipart(body, boundary)
            
            if not file_data or not filename:
                self._send_error_response('No file provided')
                return
            
            # Validate file
            validation_result = self._validate_file(file_data, filename)
            if not validation_result['valid']:
                self._send_error_response(validation_result['error'])
                return
            
            # Generate unique filename
            file_ext = Path(filename).suffix.lower()
            unique_id = str(uuid.uuid4())
            stored_filename = f"{unique_id}{file_ext}"
            file_path = IMAGES_DIR / stored_filename
            
            # Save file
            with open(file_path, 'wb') as f:
                f.write(file_data)
            
            # Get image dimensions if Pillow is available
            width, height = None, None
            if PILLOW_AVAILABLE:
                try:
                    with Image.open(BytesIO(file_data)) as img:
                        width, height = img.size
                except Exception as e:
                    logger.warning(f"Could not read image dimensions: {str(e)}")
            
            # Save metadata
            metadata = {
                'id': unique_id,
                'original_filename': filename,
                'stored_filename': stored_filename,
                'file_size': len(file_data),
                'mime_type': validation_result['mime_type'],
                'width': width,
                'height': height,
                'upload_date': datetime.now().isoformat(),
                'url': f'/images/{stored_filename}'
            }
            
            db.save_metadata(metadata)
            
            # Log success
            logger.info(f"Success: Image '{filename}' uploaded as '{stored_filename}' (ID: {unique_id})")
            
            # Send response
            self._send_json({
                'success': True,
                'message': 'Image uploaded successfully',
                'id': unique_id,
                'filename': stored_filename,
                'url': f'http://localhost:8080/images/{stored_filename}',
                'original_filename': filename,
                'size': len(file_data),
                'dimensions': {'width': width, 'height': height} if width and height else None
            }, 201)
            
        except Exception as e:
            logger.error(f"Upload error: {str(e)}")
            self._send_error_response(f"Upload failed: {str(e)}", 500)
    
    def _parse_multipart(self, body, boundary):
        """Parse multipart/form-data"""
        try:
            parts = body.split(b'--' + boundary)
            
            for part in parts:
                if b'Content-Disposition' in part:
                    # Extract filename
                    headers_end = part.find(b'\r\n\r\n')
                    if headers_end == -1:
                        continue
                    
                    headers = part[:headers_end].decode('utf-8', errors='ignore')
                    content = part[headers_end + 4:]
                    
                    # Remove trailing boundary markers
                    if content.endswith(b'\r\n'):
                        content = content[:-2]
                    
                    # Extract filename from Content-Disposition
                    if 'filename=' in headers:
                        filename_start = headers.find('filename="') + 10
                        filename_end = headers.find('"', filename_start)
                        filename = headers[filename_start:filename_end]
                        
                        return content, filename
            
            return None, None
        except Exception as e:
            logger.error(f"Error parsing multipart data: {str(e)}")
            return None, None
    
    def _validate_file(self, file_data, filename):
        """Validate file format and content"""
        # Check extension
        file_ext = Path(filename).suffix.lower()
        if file_ext not in ALLOWED_EXTENSIONS:
            return {
                'valid': False,
                'error': f'Unsupported file format. Allowed: {", ".join(ALLOWED_EXTENSIONS)}'
            }
        
        # Check file size
        if len(file_data) > MAX_FILE_SIZE:
            return {
                'valid': False,
                'error': f'File size exceeds {MAX_FILE_SIZE / (1024*1024):.1f} MB limit'
            }
        
        # Validate with Pillow if available
        mime_type = None
        if PILLOW_AVAILABLE:
            try:
                with Image.open(BytesIO(file_data)) as img:
                    img.verify()
                    # Re-open to get format (verify() closes the image)
                    with Image.open(BytesIO(file_data)) as img:
                        mime_type = f'image/{img.format.lower()}'
                        if mime_type == 'image/jpeg':
                            mime_type = 'image/jpeg'
            except Exception as e:
                return {
                    'valid': False,
                    'error': f'Invalid or corrupted image file: {str(e)}'
                }
        else:
            # Fallback to basic mime type detection
            mime_type = mimetypes.guess_type(filename)[0]
        
        if mime_type not in ALLOWED_MIME_TYPES:
            return {
                'valid': False,
                'error': 'Invalid image format'
            }
        
        return {
            'valid': True,
            'mime_type': mime_type
        }
    
    def log_message(self, format, *args):
        """Override to use custom logger"""
        logger.info(f"{self.client_address[0]} - {format % args}")


def run_server():
    """Start the HTTP server"""
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, ImageUploadHandler)
    logger.info(f"Starting Image Storage API server on port {PORT}")
    logger.info(f"Images directory: {IMAGES_DIR}")
    logger.info(f"Logs directory: {LOGS_DIR}")
    logger.info(f"Pillow available: {PILLOW_AVAILABLE}")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    finally:
        httpd.server_close()


if __name__ == '__main__':
    run_server()
