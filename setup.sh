#!/bin/bash

# BARS-AI Quick Start Script
# This script sets up and runs BARS-AI locally for development

set -e

echo "🚀 BARS-AI Quick Start"
echo "====================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version)${NC}"
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Create backend .env
echo -e "\n${YELLOW}Setting up backend...${NC}"
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
    echo -e "${YELLOW}⚠️  Please edit backend/.env and add your OpenRouter API key${NC}"
fi

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Create frontend .env
echo -e "\n${YELLOW}Setting up frontend...${NC}"
if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo -e "${GREEN}✓ Created frontend/.env${NC}"
fi

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

# Summary
echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo
echo "To start development:"
echo
echo "1. Backend (Terminal 1):"
echo "   cd backend"
echo "   npm run dev"
echo
echo "2. Frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm start"
echo
echo "Frontend will open at: http://localhost:3000"
echo "Backend API: http://localhost:5000/api"
echo
echo "⚠️  Make sure you've added your OpenRouter API key to backend/.env"
echo
