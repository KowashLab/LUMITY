"""
Configuration settings for the Image Storage API
"""

from pathlib import Path

# Directories
IMAGES_DIR = Path("/images")
LOGS_DIR = Path("/logs")
LOG_FILE = LOGS_DIR / "app.log"
DB_FILE = LOGS_DIR / "metadata.db"

# File Upload Constraints
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif'}
ALLOWED_MIME_TYPES = {'image/jpeg', 'image/png', 'image/gif'}

# Server Settings
PORT = 8000
HOST = ''

# External URL (used for generating image URLs in responses)
# This should be set to match your nginx proxy configuration
EXTERNAL_URL = '/images'  # Changed from hardcoded localhost URL

# Ensure directories exist
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
LOGS_DIR.mkdir(parents=True, exist_ok=True)
