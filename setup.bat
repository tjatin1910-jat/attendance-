@echo off
REM Face Recognition Attendance Web App - Setup Script (Windows)
REM This script automates the setup process

echo ==================================
echo Face Recognition Attendance System
echo Web Application Setup
echo ==================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detected
node -v

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm is not installed
    pause
    exit /b 1
)

echo [OK] npm detected
npm -v
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [OK] Dependencies installed successfully
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo [OK] .env file created
    echo [WARNING] Please update VITE_API_BASE_URL in .env file
) else (
    echo [WARNING] .env file already exists, skipping...
)

echo.
echo Setup complete!
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo To build for production, run:
echo   npm run build
echo.
echo Demo Credentials:
echo   Faculty: faculty1 / password123
echo   Admin:   admin1 / password123
echo.

REM Ask if user wants to start dev server
set /p START_SERVER="Do you want to start the development server now? (y/n): "

if /i "%START_SERVER%"=="y" (
    echo.
    echo Starting development server...
    echo Access the application at: http://localhost:3000
    echo.
    call npm run dev
)

pause
