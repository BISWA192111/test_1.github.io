# BARS-AI Backend Documentation

## Overview
Production-grade backend API for BARS-AI road safety intelligence platform.

## Setup

### Installation
```bash
npm install
```

### Environment Variables
Create `.env` file:
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=http://localhost:3000
OPENROUTER_API_KEY=your_key_here
OPENROUTER_MODEL=nvidia/nemotron-3-super
LOG_LEVEL=info
```

### Running
```bash
# Development
npm run dev

# Production
npm start
```

## API Routes

### POST `/api/chat/message`
Send a message to BARS-AI chatbot.

**Request:**
```json
{
  "message": "What is BNCAP?",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "success": true,
  "conversationId": "uuid",
  "timestamp": "2024-03-17T10:30:00Z",
  "message": {
    "role": "assistant",
    "content": "BNCAP is Bharat-New Car Assessment Program..."
  },
  "usage": {
    "promptTokens": 100,
    "completionTokens": 300,
    "totalTokens": 400
  },
  "model": "nvidia/nemotron-3-super"
}
```

### GET `/api/health`
Service health check.

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-03-17T10:30:00Z",
  "service": "BARS-AI Backend",
  "version": "1.0.0",
  "environment": "production",
  "uptime": 3600
}
```

## Architecture

### Services Layer
- `openRouterService`: Handles API calls to OpenRouter/NVIDIA
- `chatService`: Business logic for chat processing

### Controllers Layer
- `chatController`: Request/response handling for chat endpoints

### Middleware
- Authentication (if needed)
- CORS, Compression, Rate Limiting
- Error Handling
- Logging

## Error Handling

All errors return standardized format:
```json
{
  "success": false,
  "error": {
    "status": 400,
    "message": "Error description"
  }
}
```

## Rate Limiting

- Window: 15 minutes (configurable)
- Max Requests: 100 per window
- Returns 429 when exceeded

## Logging

Logs are written to:
- Console (development)
- `logs/error.log` (errors)
- `logs/combined.log` (all)

## Security

- Helmet.js: HTTP headers
- CORS: Configured for frontend
- Rate Limiting: Per-IP
- Input Validation: All endpoints
- Environment Variables: Sensitive data

## Performance

- Compression: Gzip enabled
- Response Time: < 2s average
- Memory: Optimized
- Concurrency: Node.js event loop

## Monitoring

### Health Checks
- API Health endpoint
- Automatic recovery
- Uptime tracking

### Metrics
- Request/Response times
- Error rates
- API token usage

## Troubleshooting

### Connection errors
Check OPENROUTER_API_KEY and network connectivity.

### Rate limiting
Increase RATE_LIMIT_MAX_REQUESTS in .env

### Slow responses
Check OpenRouter service status
