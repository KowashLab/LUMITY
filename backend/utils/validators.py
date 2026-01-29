"""
File validation utilities
"""

from pathlib import Path
from io import BytesIO
import mimetypes
import logging

# Try to import Pillow for image validation
try:
    from PIL import Image
    PILLOW_AVAILABLE = True
except ImportError:
    PILLOW_AVAILABLE = False
    print("WARNING: Pillow not available. Image validation will be limited.")

logger = logging.getLogger(__name__)


def validate_file(file_data, filename, allowed_extensions, allowed_mime_types, max_file_size):
    """
    Validate file format and content
    
    Args:
        file_data: Binary file data
        filename: Original filename
        allowed_extensions: Set of allowed file extensions
        allowed_mime_types: Set of allowed MIME types
        max_file_size: Maximum allowed file size in bytes
        
    Returns:
        dict with 'valid' (bool), 'mime_type' (str), and 'error' (str) keys
    """
    # Check extension
    file_ext = Path(filename).suffix.lower()
    if file_ext not in allowed_extensions:
        return {
            'valid': False,
            'error': f'Unsupported file format. Allowed: {", ".join(allowed_extensions)}'
        }
    
    # Check file size
    if len(file_data) > max_file_size:
        return {
            'valid': False,
            'error': f'File size exceeds {max_file_size / (1024*1024):.1f} MB limit'
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
    
    if mime_type not in allowed_mime_types:
        return {
            'valid': False,
            'error': 'Invalid image format'
        }
    
    return {
        'valid': True,
        'mime_type': mime_type
    }


def get_image_dimensions(file_data):
    """
    Get image dimensions using Pillow
    
    Args:
        file_data: Binary image data
        
    Returns:
        tuple of (width, height) or (None, None) if dimensions cannot be read
    """
    if not PILLOW_AVAILABLE:
        return None, None
    
    try:
        with Image.open(BytesIO(file_data)) as img:
            return img.size
    except Exception as e:
        logger.warning(f"Could not read image dimensions: {str(e)}")
        return None, None


def is_pillow_available():
    """Check if Pillow is available"""
    return PILLOW_AVAILABLE
