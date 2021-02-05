@echo off
cls
pushd %~dp0
echo =================
echo ==  NPM SHELL  ==
echo =================
echo > Type '.exit' to quit

:start
echo.
set /P CMD="npm> "
if /i "%CMD%"==".exit" goto start
npm %CMD%
goto start

:exit
popd
exit /b