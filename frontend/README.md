# BARS-AI Frontend Documentation

## Overview
Modern, responsive React frontend for BARS-AI road safety intelligence platform.

## Tech Stack
- React 18
- Tailwind CSS
- Framer Motion (animations)
- Recharts (data visualization)
- Zustand (state management)
- Axios (API calls)

## Setup

### Installation
```bash
npm install
```

### Environment Variables
Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### Running
```bash
# Development (hot reload)
npm start

# Build for production
npm run build

# Serve production build
npm run serve
```

## Project Structure

```
src/
├── pages/              # Full page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Chat.jsx        # Chat interface
│   └── Analytics.jsx   # Analytics dashboard
├── components/         # Reusable components
│   ├── Navbar.jsx
│   ├── ChatComponents.jsx
│   ├── Charts.jsx
│   └── UIComponents.jsx
├── hooks/              # Custom React hooks
│   └── useChat.js      # Chat logic hook
├── store/              # State management
│   └── chatStore.js    # Zustand store
├── utils/              # Utilities
│   └── api.js          # API client
├── styles/             # Global styles
│   └── index.css
├── App.jsx             # Root component
└── index.js            # Entry point
```

## Components

### Pages
- **Dashboard**: KPIs, statistics, charts, quick links
- **Chat**: Real-time chat with BARS-AI
- **Analytics**: Detailed data analysis

### Core Components
- `Navbar`: Responsive navigation bar
- `MessageBubble`: Chat message display
- `MessageInput`: Chat input form
- `StatCard`: Dashboard statistics
- `Charts`: Data visualizations (Line, Bar, Pie)

### UI Components
- `Alert`: Notification/alert boxes
- `Spinner`: Loading indicator
- `LoadingState`: Full-page loading
- `EmptyState`: Empty state UI

## Responsive Design

### Mobile First Approach
- Base styles for mobile (< 768px)
- Tablet (768px - 1024px) with `md:` prefix
- Desktop (> 1024px) with `lg:` prefix

### Key Breakpoints
```css
sm: 640px  /* not used much, default is mobile */
md: 768px  /* tablet */
lg: 1024px /* desktop */
xl: 1280px /* large screens */
```

## State Management

Using Zustand for chat state:
```javascript
const useChatStore = create((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
}));
```

## API Integration

### Chat API
```javascript
import { chatAPI } from './utils/api';

// Send message
const response = await chatAPI.sendMessage(
  "Hello",
  conversationHistory
);
```

### Custom Hook: useChat
```javascript
const { messages, isLoading, error, sendMessage } = useChat();

// Send message
await sendMessage("Your question here");
```

## Styling with Tailwind CSS

### Color Palette
- Primary: Blue (600-700)
- Backgrounds: Gray (800-900)
- Text: Gray (100-400)
- Accents: Cyan, Green, Red, Purple

### Custom Configuration
See `tailwind.config.js` for extended colors and utilities.

## Animations with Framer Motion

### Common Patterns
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
>
  Content
</motion.div>
```

## Performance Optimizations

✅ Code Splitting with React.lazy
✅ Image optimization
✅ Memoization for expensive components
✅ Efficient state updates
✅ CSS-in-JS optimization

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | Latest 2 |
| Firefox | Latest 2 |
| Safari  | Latest 2 |
| Edge    | Latest 2 |

## Building for Production

```bash
# Create optimized build
npm run build

# Output in build/ directory
# Ready for deployment
```

### Build Optimization
- Tree shaking enabled
- Code minification
- Asset bundling
- Source maps (dev mode)

## Deployment

### Vercel
```bash
vercel deploy
```

### Netlify
```bash
netlify deploy --prod
```

### Docker
```bash
docker build -t bars-ai-frontend .
docker run -p 80:80 bars-ai-frontend
```

## Troubleshooting

### API Connection Issues
- Check `REACT_APP_API_URL` in `.env`
- Verify backend is running
- Check CORS headers in browser console

### Styling Issues
- Rebuild Tailwind CSS: `npm run build`
- Clear cache: `rm -rf node_modules/.cache`
- Restart dev server

### Performance Issues
- Use React DevTools Profiler
- Check Network tab in browser
- Review Lighthouse report

## Development Tips

### Hot Reload
Automatic with `npm start` - just save files.

### React DevTools
Install browser extension for debugging component tree.

### Tailwind IntelliSense
Install VS Code extension for autocomplete.

### Best Practices
- Keep components small and focused
- Use custom hooks for logic reuse
- Memoize expensive components
- Lazy load routes
- Optimize images

## Testing

```bash
# Run tests
npm test

# Generate coverage report
npm test -- --coverage
```

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `REACT_APP_API_URL` | localhost:5000 | Backend API URL |
| `REACT_APP_ENV` | development | Environment type |

---

For full documentation, see [README.md](../README.md)
