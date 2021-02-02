@echo off
cls
pushd %~dp0
echo ======================
echo ==  Node Task List  ==
echo ======================
echo.
call npx ntl
pause
popd
exit /b