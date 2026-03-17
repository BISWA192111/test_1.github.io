# BARS-AI Deployment Guide

## Pre-Deployment Checklist

- [ ] OpenRouter API key acquired
- [ ] Environment variables configured
- [ ] Node.js 18+ installed
- [ ] Docker & Docker Compose available
- [ ] Domain name configured
- [ ] SSL certificates obtained
- [ ] Database backups planned

## Local Development Deployment

### 1. Clone & Setup
```bash
git clone <repository>
cd bars-ai
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env

# Edit .env with your values
# - OPENROUTER_API_KEY=your_key
# - FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env

# REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Run Development Servers
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start
```

Access at: `http://localhost:3000`

## Docker Deployment

### Quick Start
```bash
# Set environment variables
export OPENROUTER_API_KEY=your_key_here

# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Production Deployment Steps

#### 1. Server Setup (Linux/Ubuntu)
```bash
# Install Docker
sudo apt update
sudo apt install docker.io
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

#### 2. Setup Application
```bash
# Create app directory
mkdir -p /opt/bars-ai
cd /opt/bars-ai

# Clone repository
git clone <repo-url> .

# Create .env file
cat > .env << EOF
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com
OPENROUTER_API_KEY=sk-or-v1-xxxxx
OPENROUTER_MODEL=nvidia/nemotron-3-super
LOG_LEVEL=info
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
EOF
```

#### 3. Deploy with Docker Compose
```bash
docker-compose -f docker-compose.yml up -d

# Verify services
docker ps
docker-compose logs -f

# Health check
curl http://localhost:5000/api/health
curl http://localhost:3000
```

#### 4. Setup Reverse Proxy (Nginx)

Create `/etc/nginx/sites-available/bars-ai`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL Certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/bars-ai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. SSL Certificate (Let's Encrypt)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d your-domain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

## Cloud Deployment

### AWS EC2
```bash
# Launch instance (Ubuntu 22.04)
# Security groups: 22 (SSH), 80, 443 (HTTP/HTTPS)

# Connect via SSH
ssh -i key.pem ubuntu@your-instance-ip

# Follow Docker setup from above
```

### Azure Container Instances
```bash
# Create resource group
az group create --name bars-ai --location eastus

# Deploy container
az container create \
  --resource-group bars-ai \
  --name bars-ai-backend \
  --image <your-registry>/bars-ai-backend \
  --environment-variables \
    OPENROUTER_API_KEY=your_key \
    NODE_ENV=production \
  --ports 5000
```

### Google Cloud Run
```bash
# Build image
gcloud builds submit --tag gcr.io/PROJECT_ID/bars-ai-backend

# Deploy
gcloud run deploy bars-ai-backend \
  --image gcr.io/PROJECT_ID/bars-ai-backend \
  --platform managed
```

## Monitoring & Maintenance

### Health Checks
```bash
# Backend health
curl https://your-domain.com/api/health

# Monitor logs
docker-compose logs -f backend
```

### Backup
```bash
# Backup logs
docker-compose exec backend tar -czf logs.tar.gz logs/
docker cp $(docker-compose ps -q backend):/app/logs.tar.gz ./
```

### Updates
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Scaling

### Horizontal Scaling (Multiple Instances)
- Deploy multiple backend instances behind load balancer
- Use Redis for session management
- Implement API caching

### Performance Optimization
- Enable CDN for frontend assets
- Implement caching headers
- Use database connection pooling
- Monitor and optimize queries

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Regular backups
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] API keys rotated regularly
- [ ] System updates applied
- [ ] Monitoring and alerting enabled

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 PID
```

### Out of Memory
```bash
# Check Docker resources
docker stats

# Increase Docker memory allocation
# Edit Docker Desktop settings or docker daemon.json
```

### SSL Certificate Issues
```bash
# Renew certificate
sudo certbot renew

# Check certificate expiry
echo | openssl s_client -servername your-domain.com -connect your-domain.com:443 2>/dev/null | openssl x509 -noout -dates
```

## Support

For deployment issues:
1. Check logs: `docker-compose logs`
2. Verify environment variables
3. Test health endpoints
4. Check firewall/security groups
5. Review API key validity

---

Last Updated: March 2026
