# Backend Deployment Guide

## Quick Deployment to Railway

### 1. Sign Up for Railway
- Go to [railway.app](https://railway.app)
- Click "Sign up" (use GitHub)
- Authorize Railway to access your GitHub account

### 2. Create New Project
- Click "Create New Project"
- Select "Deploy from GitHub"
- Select your repository

### 3. Deploy Backend
- In Railway, click "Add Service" → "GitHub Repo"
- Select your repo
- **IMPORTANT**: Specify root directory as `backend`
- Railway will auto-detect Node.js

### 4. Set Environment Variables
In Railway dashboard:
1. Go to your `bars-ai-backend` service
2. Click "Variables" tab
3. Add these variables:

```
OPENROUTER_API_KEY=sk-or-v1-xxxxx     # Your actual API key
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://frontend-74l1l7scu-biswajit-bhattacharya-s-projects.vercel.app
OPENROUTER_MODEL=nvidia/Llama-3.1-Nemotron-70B-Instruct
LOG_LEVEL=info
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### 5. Get Your Backend URL
- In Railway, go to "Deployments" tab
- Find "Public URL" (e.g., `https://bars-ai-backend-production.up.railway.app`)
- Copy this URL

### 6. Update Vercel Frontend
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select **BARS-AI frontend** project
3. Go to **Settings → Environment Variables**
4. Add/Update:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://bars-ai-backend-production.up.railway.app/api` (replace with your Railway URL)
5. Click Save

### 7. Redeploy Frontend on Vercel
1. Go to **Deployments**
2. Click the three dots on the latest deployment
3. Click **Redeploy**

---

## Alternative: Deploy to Render.com

### 1. Sign Up for Render
- Go to [render.com](https://render.com)
- Sign up with GitHub
- Authorize Render

### 2. Create Web Service
1. Click "New +" → "Web Service"
2. Connect GitHub repo
3. Select repo
4. Set **Root Directory** to `backend`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `node src/server.js`

### 3. Add Environment Variables
Add the same variables as above in Render's environment section

### 4. Get Your Backend URL
After deployment (takes ~2-3 min):
- Your URL will be: `https://bars-ai-backend.onrender.com`

### 5. Update Vercel
Same as Railway steps 6-7, but use your Render URL

---

## Testing Your Deployment

### Test Backend Health
```powershell
# Replace with your Railway/Render URL
curl https://your-backend-url/api/health
```

### Test Chat Endpoint
```powershell
$payload = '{"message":"What is BNCAP?","conversationHistory":[]}'
$response = Invoke-WebRequest -Uri "https://your-backend-url/api/chat/message" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $payload

$response.Content | ConvertFrom-Json | ConvertTo-Json
```

---

## Troubleshooting

### 500 Error: OPENROUTER_API_KEY not configured
- Check Railway/Render dashboard → Environment Variables
- Make sure `OPENROUTER_API_KEY` is added and saved
- Redeploy the service

### Network Error in frontend
- Verify `REACT_APP_API_URL` is set in Vercel
- Make sure the URL is correct (check Railway/Render dashboard)
- Click "Redeploy" in Vercel Deployments

### Deployment fails
- Check Railway/Render build logs
- Ensure `backend` folder has `package.json`
- Check that all dependencies install correctly

---

## Monitoring

### View Logs
**Railway:**
- Go to service → Logs tab

**Render:**
- Go to service → Logs tab

### Health Status
Both services provide monitoring dashboards. Check:
- CPU usage
- Memory usage
- Request count
- Error rate

---

## Cost

- **Railway**: Free tier available ($5/month credit)
- **Render**: Free tier available (sleeps after 15 min inactivity)

For production, consider upgrading to paid plans.
