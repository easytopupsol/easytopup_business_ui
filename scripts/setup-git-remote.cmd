@echo off
setlocal
cd /d "%~dp0.."
set "REMOTE_URL=https://github.com/easytopupsol/easytopup_business_ui.git"
where git >nul 2>&1
if errorlevel 1 (
  echo Git is not installed or not in PATH.
  exit /b 1
)
if not exist ".git" (
  git init
  if errorlevel 1 exit /b 1
)
git remote get-url origin >nul 2>&1
if errorlevel 1 (
  git remote add origin "%REMOTE_URL%"
) else (
  git remote set-url origin "%REMOTE_URL%"
)
if errorlevel 1 exit /b 1
git branch -M main
if errorlevel 1 exit /b 1
echo.
echo Git remote configured. Nothing has been pushed.
git remote -v
endlocal
