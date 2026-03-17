# BARS-AI Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ React 18 + Tailwind CSS + Framer Motion              │  │
│  │ - Dashboard (KPIs, Charts)                           │  │
│  │ - Chat Interface (AI Conversations)                  │  │
│  │ - Analytics (Data Visualizations)                    │  │
│  │ - Responsive Design (Mobile/Tablet/Desktop)          │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/HTTPS
                       │ REST API
┌──────────────────────▼──────────────────────────────────────┐
│                      API Layer                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Express.js Backend                                    │  │
│  │ - CORS, Security Headers (Helmet)                    │  │
│  │ - Rate Limiting                                       │  │
│  │ - Request Logging                                     │  │
│  │ - Error Handling                                      │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼──────┐          ┌───────────▼──────┐
│ Chat Routes  │          │ Health Routes    │
│ /chat/msg    │          │ /health          │
│ /chat/stream │          │                  │
└───────┬──────┘          └──────────────────┘
        │
┌───────▼──────────────────────────┐
│    Services Layer                │
│  ┌────────────────────────────┐  │
│  │ Chat Service               │  │
│  │ - Message Processing       │  │
│  │ - Conversation History     │  │
│  │ - Validation               │  │
│  └────────────────────────────┘  │
│  ┌────────────────────────────┐  │
│  │ OpenRouter Service         │  │
│  │ - API Integration          │  │
│  │ - Token Management         │  │
│  │ - Stream Handling          │  │
│  └────────────────────────────┘  │
└───────┬──────────────────────────┘
        │
        │ HTTPS
        │
┌───────▼──────────────────────────┐
│   OpenRouter API                 │
│   NVIDIA Nemotron 3 Super        │
│   - 80B Parameters               │
│   - Advanced Reasoning           │
│   - Multi-language Support       │
└──────────────────────────────────┘
```

## Data Flow

### Chat Message Flow
```
User Input
    ↓
Frontend Input Component
    ↓
useChat Hook
    ↓
Zustand Store Update
    ↓
API Call (axios)
    ↓
Backend /api/chat/message
    ↓
Chat Controller
    ↓
Chat Service
    ↓
Validation
    ↓
OpenRouter Service
    ↓
NVIDIA Nemotron 3 Super
    ↓
Response Processing
    ↓
Token Usage Tracking
    ↓
API Response
    ↓
Frontend Message Bubble
    ↓
Store Update
    ↓
UI Re-render
```

## Component Hierarchy

```
App
├── Navbar
│   └── Mobile Menu
├── Routes
│   ├── Dashboard Page
│   │   ├── Hero Section
│   │   ├── Stats Grid
│   │   │   └── StatCard (x4)
│   │   ├── Charts Grid
│   │   │   ├── LineChart
│   │   │   ├── BarChart
│   │   │   └── PieChart
│   │   └── Quick Links
│   ├── Chat Page
│   │   ├── Chat Header
│   │   ├── Messages Container
│   │   │   └── MessageBubble (repeating)
│   │   └── Input Section
│   │       └── MessageInput
│   └── Analytics Page
│       ├── Header with Filters
│       ├── KPI Cards
│       ├── Charts (multiple)
│       └── Insights Section
└── Footer

```

## State Management

### Zustand Store (useChatStore)
```javascript
{
  messages: [Message[]],
  isLoading: boolean,
  error: string | null,
  conversationId: string | null,
  
  // Actions
  addMessage(message),
  setLoading(boolean),
  setError(error),
  clearMessages(),
  clearError()
}
```

## API Endpoints

### Chat Endpoints
```
POST /api/chat/message
  Request: { message, conversationHistory }
  Response: { success, conversationId, message, usage, model }

POST /api/chat/stream
  Request: { message, conversationHistory }
  Response: Server-Sent Events stream
```

### Health Endpoints
```
GET /api/health
  Response: { success, status, timestamp, service, version, environment, uptime }
```

## Security Architecture

```
Request Flow Security Layers:
  1. CORS Check
  2. Rate Limiting (IP-based)
  3. Body Size Validation
  4. Input Validation
  5. Authentication (if needed)
  6. Authorization (if needed)
  7. Processing
  8. Response Validation
  9. Error Handling
  10. Logging
```

## Deployment Architecture

### Development
```
localhost:3000 (Frontend)
    ↓
localhost:5000 (Backend)
    ↓
OpenRouter API
```

### Production (Docker)
```
Nginx (Reverse Proxy)
    ↓
React App (Docker Container)
    ↓
Express Backend (Docker Container)
    ↓
OpenRouter API
```

### Scalable Production
```
Load Balancer
    ↓
├── Nginx Server 1
├── Nginx Server 2
├── Nginx Server N
    ↓
├── Backend Instance 1
├── Backend Instance 2
├── Backend Instance N
    ↓
├── Redis Cache
└── OpenRouter API
```

## Performance Optimization Strategy

### Frontend
- Code Splitting with React.lazy()
- Image optimization
- CSS minification
- Gzip compression
- Browser caching

### Backend
- Request compression
- Response caching
- Connection pooling
- Rate limiting
- Logging optimization

### Network
- CDN for static assets
- HTTP/2 support
- DNS optimization
- Reduce payload size

## Monitoring & Observability

```
Logs ─────────────────┐
  │                   │
Error Tracking        │
  │                   │
Performance Metrics ──┤──→ Analysis
  │                   │
API Usage             │
  │                   │
User Analytics ───────┘
```

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|----------|---------|
| UI | React 18 | Component framework |
| Styling | Tailwind CSS | Utility-first CSS |
| Animation | Framer Motion | Smooth animations |
| Charts | Recharts | Data visualization |
| State | Zustand | Lightweight state |
| HTTP | Axios | API calls |
| Server | Express.js | REST API |
| AI | OpenRouter + NVIDIA | LLM queries |
| Deploy | Docker | Containerization |
| Proxy | Nginx | Reverse proxy |

## Scalability Considerations

✅ Microservices-ready
✅ Loadable sessions state
✅ Redis-compatible caching
✅ Horizontal scaling support
✅ Database-agnostic design
✅ API versioning ready
✅ Feature flag support

---

Last Updated: March 2026
