"""
HTTP request parsing utilities
"""

import logging

logger = logging.getLogger(__name__)


def parse_multipart_data(body, boundary):
    """
    Parse multipart/form-data
    
    Args:
        body: Raw request body bytes
        boundary: Multipart boundary bytes
        
    Returns:
        tuple of (file_data, filename) or (None, None) if parsing fails
    """
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
