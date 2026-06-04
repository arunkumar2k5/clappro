@echo off
echo ========================================
echo Starting CLAP PRO Application
echo ========================================
echo.

REM Get the directory where the batch file is located
set SCRIPT_DIR=%~dp0

REM Start Backend
echo [1/2] Starting Backend Server...
start "CLAP PRO - Backend" cmd /k "cd /d %SCRIPT_DIR%backend && call venv\Scripts\activate && uvicorn main:app --reload --host 0.0.0.0 --port 8001"
timeout /t 3 /nobreak >nul

REM Start Frontend
echo [2/2] Starting Frontend Server...
start "CLAP PRO - Frontend" cmd /k "cd /d %SCRIPT_DIR%frontend && npm run dev"

echo.
echo ========================================
echo CLAP PRO is starting...
echo ========================================
echo.
echo Backend: http://localhost:8001
echo Frontend: http://localhost:5173
echo.
echo Two new windows have been opened:
echo   - Backend Server (Python/FastAPI)
echo   - Frontend Server (Vite/React)
echo.
echo Close those windows to stop the servers.
echo.
pause
