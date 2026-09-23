@echo off
setlocal

cd /d "%~dp0"

echo.
echo ========================================
echo  Xin Mei Portfolio - Firebase Deploy
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed or is not available in PATH.
  echo Install Node.js first, then run this file again.
  pause
  exit /b 1
)

if not exist "firebase.json" (
  echo ERROR: firebase.json was not found.
  echo Please run this file from the portfolio project folder.
  pause
  exit /b 1
)

if not exist ".firebaserc" (
  echo ERROR: .firebaserc was not found.
  echo Firebase project is not configured for this folder.
  pause
  exit /b 1
)

echo Building static files into dist...
if not exist "dist" mkdir "dist"

robocopy "admin" "dist\admin" /MIR /NFL /NDL /NJH /NJS /NP >nul
if errorlevel 8 goto build_failed

robocopy "assets" "dist\assets" /MIR /NFL /NDL /NJH /NJS /NP >nul
if errorlevel 8 goto build_failed

robocopy "content" "dist\content" /MIR /NFL /NDL /NJH /NJS /NP >nul
if errorlevel 8 goto build_failed

robocopy "projects" "dist\projects" /MIR /NFL /NDL /NJH /NJS /NP >nul
if errorlevel 8 goto build_failed

copy /Y "index.html" "dist\index.html" >nul
copy /Y "project.html" "dist\project.html" >nul
copy /Y "app.js" "dist\app.js" >nul
copy /Y "case-study.js" "dist\case-study.js" >nul
copy /Y "project.js" "dist\project.js" >nul
copy /Y "styles.css" "dist\styles.css" >nul

echo Build complete.
echo.
echo Deploying to Firebase Hosting...
call npx firebase-tools deploy --only hosting
if errorlevel 1 goto deploy_failed

echo.
echo ========================================
echo  Deploy complete
echo ========================================
echo Website:
echo https://xin-mei-s-portfolio.web.app
echo.
echo CMS:
echo https://xin-mei-s-portfolio.web.app/admin/
echo.
pause
exit /b 0

:build_failed
echo.
echo ERROR: Build failed while copying files into dist.
pause
exit /b 1

:deploy_failed
echo.
echo ERROR: Firebase deploy failed.
echo Check the message above. You may need to run:
echo npx firebase-tools login
echo.
pause
exit /b 1
