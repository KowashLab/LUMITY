"""
Database manager for image metadata
"""

import sqlite3
import logging

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
