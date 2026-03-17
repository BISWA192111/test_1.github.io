# BARS-AI - Production-Grade Road Safety Intelligence Platform

A modern, full-stack application providing AI-powered road safety intelligence for India, powered by **NVIDIA Nemotron 3 Super** model via **OpenRouter API**.

## 🌟 Features

### Core Functionality
- **AI Chatbot**: Intelligent Q&A on road safety, government schemes, vehicle safety standards
- **Real-time Dashboard**: Comprehensive road safety metrics and KPIs
- **Data Analytics**: Detailed charts and trends analysis
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Technology Stack
- **Frontend**: React 18, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Node.js/Express, OpenRouter API integration
- **AI Model**: NVIDIA Nemotron 3 Super (80B parameters)
- **State Management**: Zustand
- **Deployment**: Docker, Docker Compose

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker & Docker Compose (for containerized deployment)
- OpenRouter API Key (Free NVIDIA Nemotron 3 Super model)
- Git

## 🚀 Quick Start

### Development Setup

#### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your OpenRouter API key to .env
npm run dev
```

#### 2. Frontend Setup (in new terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

The app will be available at `http://localhost:3000`

### Production Deployment with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 📁 Project Structure

```
bars-ai/
├── backend/
│   ├── src/
│   │   ├── server.js          # Express server
│   │   ├── config.js          # Configuration
│   │   ├── logger.js          # Logging setup
│   │   ├── routes/            # API routes
│   │   ├── controllers/       # Request handlers
│   │   └── services/          # Business logic
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/             # React pages
│   │   ├── components/        # Reusable components
│   │   ├── hooks/             # Custom hooks
│   │   ├── store/             # State management
│   │   ├── utils/             # Helper functions
│   │   └── styles/            # CSS/styling
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**:
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=nvidia/nemotron-3-super
LOG_LEVEL=info
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (.env)**:
```
REACT_APP_API_URL=https://api.your-domain.com
REACT_APP_ENV=production
```

## 📚 API Documentation

### Chat Endpoint
**POST** `/api/chat/message`

Request:
```json
{
  "message": "What is BNCAP?",
  "conversationHistory": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

Response:
```json
{
  "success": true,
  "conversationId": "uuid",
  "message": {
    "role": "assistant",
    "content": "BNCAP is..."
  },
  "usage": {
    "promptTokens": 150,
    "completionTokens": 450,
    "totalTokens": 600
  }
}
```

### Health Check
**GET** `/api/health`

## 🎨 UI Components

### Pages
- **Dashboard**: KPIs, stats, quick links
- **Chat**: AI-powered conversational interface
- **Analytics**: Detailed data visualizations

### Key Components
- `Navbar`: Responsive navigation
- `ChatComponents`: Message bubbles, input
- `Charts`: Recharts visualizations
- `UIComponents`: Alerts, spinners, empty states

## 📊 Best Practices Implemented

✅ **Security**:
- CORS configuration
- Helmet.js for HTTP headers
- Rate limiting
- Input validation
- Secure API keys via environment variables

✅ **Performance**:
- Gzip compression
- Image optimization
- Code splitting
- Caching headers
- CDN-ready

✅ **Scalability**:
- Microservices-ready architecture
- State management with Zustand
- Modular component structure
- Docker containerization

✅ **Responsiveness**:
- Mobile-first design
- Tailwind CSS breakpoints
- Touch-friendly UI
- Viewport optimization

✅ **Accessibility**:
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast

## 🔐 Security Considerations

- API keys stored in environment variables only
- HTTPS enforced in production
- CORS properly configured
- Rate limiting enabled
- Input validation on all endpoints
- Security headers via Helmet.js
- XSS and CSRF protection

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## 📈 Performance Metrics

- Lighthouse Score: 90+
- Core Web Vitals: Optimized
- First Contentful Paint: < 2s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🐛 Troubleshooting

### Backend won't start
```bash
# Clear node_modules
rm -rf backend/node_modules
npm install

# Check logs
npm run dev
```

### Frontend API connection issues
- Verify REACT_APP_API_URL in .env
- Check backend is running on port 5000
- Review CORS settings in backend/src/server.js

### Docker issues
```bash
# Rebuild images
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## 📝 Deployment Guides

### AWS EC2
1. SSH into instance
2. Clone repository
3. Install Docker and Docker Compose
4. Set environment variables
5. Run `docker-compose up -d`

### Azure App Service
1. Create App Service container
2. Configure environment variables
3. Deploy Docker Compose configuration
4. Monitor with Application Insights

### Vercel/Netlify (Frontend only)
```bash
npm run build
# Deploy build folder
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

MIT License - See LICENSE file

## 📞 Support

- **Issues**: GitHub Issues
- **Email**: support@bars-ai.com
- **Documentation**: /docs

---

**Built with ❤️ for Road Safety in India**

Last Updated: March 2026
Version: 1.0.0
