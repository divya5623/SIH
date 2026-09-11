@echo off
echo ================================================
echo   AWAAZ SARPANCH - Backend Server
echo ================================================
echo.

:: Check if .env exists
if not exist .env (
    echo [SETUP] Creating .env from template...
    copy .env.example .env
    echo [!] Please edit backend\.env and add your API keys
    echo     - GEMINI_API_KEY from https://aistudio.google.com
    echo     - BHASHINI_API_KEY from https://bhashini.gov.in
    echo.
)

:: Install dependencies if needed
echo [1/2] Checking Python dependencies...
pip install -r requirements.txt -q

:: Start the server
echo.
echo [2/2] Starting FastAPI server...
echo.
echo   API:  http://localhost:8000
echo   Docs: http://localhost:8000/docs
echo.
uvicorn main:app --reload --port 8000 --host 0.0.0.0
