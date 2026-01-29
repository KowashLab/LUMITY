#!/usr/bin/env python3
"""
Image Storage Backend API - Main Entry Point
Refactored with clean architecture
"""

from http.server import HTTPServer
import logging

from core.config import PORT, HOST, IMAGES_DIR, LOGS_DIR, DB_FILE
from core.database import DatabaseManager
from api.handlers import ImageUploadHandler
from utils.logger import setup_logging
from utils.validators import is_pillow_available

# Setup logging
logger = setup_logging()


def run_server():
    """Start the HTTP server"""
    # Initialize database
    db = DatabaseManager(DB_FILE)
    
    # Set database on handler class
    ImageUploadHandler.db = db
    
    # Create and start server
    server_address = (HOST, PORT)
    httpd = HTTPServer(server_address, ImageUploadHandler)
    
    logger.info(f"Starting Image Storage API server on port {PORT}")
    logger.info(f"Images directory: {IMAGES_DIR}")
    logger.info(f"Logs directory: {LOGS_DIR}")
    logger.info(f"Pillow available: {is_pillow_available()}")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    finally:
        httpd.server_close()


if __name__ == '__main__':
    run_server()
