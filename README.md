# Lumity Image Storage

Modern image storage service with instant upload and direct link sharing. Built with React, Python, Docker, and Nginx.

## Features

- 🚀 Instant image upload (drag & drop or click)
- 🔗 Direct links to uploaded images
- 🎨 Support for JPG, PNG, GIF formats
- 📦 Docker containerized architecture
- 🔒 File validation and security
- 📊 SQLite metadata storage
- 📝 Comprehensive logging

## Tech Stack

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Python 3.12 + Pillow
- **Web Server**: Nginx
- **Database**: SQLite
- **Containerization**: Docker + Docker Compose

## Quick Start

### Prerequisites

- Docker Desktop
- Node.js 18+

### Installation

1. Clone the repository
2. Start Docker services:

```bash
docker compose up --build
```

3. Install frontend dependencies:

```bash
npm install
```

4. Start development server:

```bash
npm run dev
```

### Access Points

- **Frontend (React)**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Nginx (Images)**: http://localhost:8080/images/\<filename\>

## Usage

### Web Interface

1. Start development server: `npm run dev`
2. Open http://localhost:5173
3. Use the drag & drop interface to upload images
4. Copy direct link with one click

### API (Command Line)

```bash
curl -X POST -F "file=@your-image.jpg" http://localhost:8000/upload
```

## API Endpoints

- `POST /upload` - Upload image
- `GET /images/<filename>` - View uploaded image
- `GET /health` - Health check
- `GET /images` - List all images metadata

## Project Structure

```
lumity/
├── backend/           # Python API server
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── nginx/            # Nginx configuration
│   ├── nginx.conf
│   └── Dockerfile
├── src/              # Frontend React app
└── docker-compose.yml
```

## License

MIT
  