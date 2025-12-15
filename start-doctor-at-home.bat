@echo off
title Doctor At Home - Full Stack Dev
color 0A

echo =====================================================
echo   🚀 Starting Doctor At Home Local Development Server
echo =====================================================
echo.

REM Change directory to the project folder
cd /d "%~dp0"

REM Start the secure backend API in a new window
echo 🔧 Starting backend (server.js)...
start "Backend (Secure API)" cmd /k "npm run server"

REM Wait 5 seconds to ensure the backend is ready
timeout /t 5 /nobreak >nul

REM Start the frontend (Vite dev server) in a new window
echo 🌐 Starting frontend (Vite)...
start "Frontend (Vite)" cmd /k "npm run dev"

REM Wait a few seconds to ensure frontend boots up
timeout /t 6 /nobreak >nul

REM Automatically open the browser
echo 🧭 Opening website in default browser...
start "" "http://localhost:3000"

echo.
echo ✅ All systems running! Press Ctrl+C in the open windows to stop servers.
echo.

pause
