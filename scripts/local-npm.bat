@echo off
cls
pushd %~dp0
echo =================
echo ==  LOCAL NPM  ==
echo =================
echo.
set /P CMD="npm> "
npm %CMD%
pause
popd
exit /b