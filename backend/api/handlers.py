"""
HTTP request handlers for the Image Storage API
"""

import json
import logging
import uuid
from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
from pathlib import Path

from core.config import (
    IMAGES_DIR, MAX_FILE_SIZE, ALLOWED_EXTENSIONS, 
    ALLOWED_MIME_TYPES, EXTERNAL_URL
)
from utils.validators import validate_file, get_image_dimensions
from utils.parsers import parse_multipart_data

logger = logging.getLogger(__name__)


class ImageUploadHandler(BaseHTTPRequestHandler):
    """HTTP Request Handler for image upload API"""
    
    # Database instance will be set by the server
    db = None
    
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
                images = self.db.get_all_metadata()
                self._send_json({'success': True, 'images': images})
            except Exception as e:
                logger.error(f"Error fetching images: {str(e)}")
                self._send_error_response(f"Internal server error: {str(e)}", 500)
            return
        
        # Get specific image metadata
        if parsed_path.path.startswith('/image/'):
            image_id = parsed_path.path.split('/')[-1]
            metadata = self.db.get_metadata(image_id)
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
            file_data, filename = parse_multipart_data(body, boundary)
            
            if not file_data or not filename:
                self._send_error_response('No file provided')
                return
            
            # Validate file
            validation_result = validate_file(
                file_data, filename, ALLOWED_EXTENSIONS, 
                ALLOWED_MIME_TYPES, MAX_FILE_SIZE
            )
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
            
            # Get image dimensions
            width, height = get_image_dimensions(file_data)
            
            # Generate proper URL (relative to work with nginx proxy)
            image_url = f"{EXTERNAL_URL}/{stored_filename}"
            
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
                'url': image_url
            }
            
            self.db.save_metadata(metadata)
            
            # Log success
            logger.info(f"Success: Image '{filename}' uploaded as '{stored_filename}' (ID: {unique_id})")
            
            # Send response
            self._send_json({
                'success': True,
                'message': 'Image uploaded successfully',
                'id': unique_id,
                'filename': stored_filename,
                'url': image_url,
                'original_filename': filename,
                'size': len(file_data),
                'dimensions': {'width': width, 'height': height} if width and height else None
            }, 201)
            
        except Exception as e:
            logger.error(f"Upload error: {str(e)}", exc_info=True)
            self._send_error_response(f"Upload failed: {str(e)}", 500)
    
    def log_message(self, format, *args):
        """Override to use custom logger"""
        logger.info(f"{self.client_address[0]} - {format % args}")
