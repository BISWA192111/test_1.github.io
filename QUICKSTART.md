# BARS-AI Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- Git

### Step 1: Clone & Navigate
```bash
cd bars-ai
```

### Step 2: Run Setup Script

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
bash setup.sh
```

Or manually:
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env and add your OpenRouter API key

# Frontend
cd frontend
npm install
cp .env.example .env
```

### Step 3: Get OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up (free account)
3. Get your API key
4. Add to `backend/.env`:
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   ```

### Step 4: Start Servers

**Terminal 1 (Backend)**:
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 (Frontend)**:
```bash
cd frontend
npm start
# Opens http://localhost:3000
```

### Step 5: Test It!

1. Open http://localhost:3000
2. Navigate to Chat page
3. Ask: "What is BNCAP?"
4. Wait for AI response

## 🎯 Features to Try

- **Dashboard**: View road safety KPIs and statistics
- **Chat**: Ask any road safety question
- **Analytics**: Explore detailed charts and trends

## 📱 Mobile Testing

Test responsive design:
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes

## 🔧 Common Issues

### API Key Error?
- Check `backend/.env` has valid key
- Key should start with `sk-or-v1-`

### Port Already in Use?
```bash
# Find and kill process
lsof -i :5000  # Backend
lsof -i :3000  # Frontend
kill -9 PID
```

### Blank Page?
- Check browser console (F12) for errors
- Verify backend is running
- Check Network tab for API calls

## 📚 Next Steps

1. **Read Documentation**:
   - [Backend README](backend/README.md)
   - [Frontend README](frontend/README.md)

2. **Explore Code**:
   - Backend routes: `backend/src/routes/`
   - Frontend pages: `frontend/src/pages/`
   - Components: `frontend/src/components/`

3. **Deploy**:
   - See [DEPLOYMENT.md](DEPLOYMENT.md)
   - Production with Docker

## 🆘 Need Help?

1. Check logs:
```bash
docker-compose logs -f  # If using Docker
npm run dev             # Shows console output
```

2. Verify Setup:
```bash
curl http://localhost:5000/api/health
curl http://localhost:3000
```

3. Check Firewall:
   - Port 5000 (backend)
   - Port 3000 (frontend)

---

**You're all set! Happy coding! 🎉**

For full documentation, see [README.md](README.md)
