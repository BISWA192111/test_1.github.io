@echo off
REM BARS-AI Quick Start Script for Windows
REM This script sets up and runs BARS-AI locally for development

echo.
echo =================================
echo   BARS-AI Quick Start (Windows)
echo =================================
echo.

REM Check Node.js
echo Checking prerequisites...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed.
    exit /b 1
)

echo [OK] Node.js and npm found
echo.

REM Setup Backend
echo Setting up backend...
if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env"
    echo [OK] Created backend\.env
    echo [WARNING] Please edit backend\.env and add your OpenRouter API key
)

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Backend setup failed
    exit /b 1
)
cd ..
echo [OK] Backend dependencies installed
echo.

REM Setup Frontend
echo Setting up frontend...
if not exist "frontend\.env" (
    copy "frontend\.env.example" "frontend\.env"
    echo [OK] Created frontend\.env
)

echo Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Frontend setup failed
    exit /b 1
)
cd ..
echo [OK] Frontend dependencies installed
echo.

REM Summary
echo ====================================
echo   Setup Complete!
echo ====================================
echo.
echo To start development:
echo.
echo 1. Backend (Command Prompt 1):
echo    cd backend
echo    npm run dev
echo.
echo 2. Frontend (Command Prompt 2):
echo    cd frontend
echo    npm start
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000/api
echo.
echo [WARNING] Make sure you've added your OpenRouter API key to backend\.env
echo.
pause
