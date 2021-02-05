@echo off
cls
pushd %~dp0
echo =================
echo ==  GIT SHELL  ==
echo =================
echo > Type '.exit' to quit

:start
echo.
set /P CMD="git> "
if /i "%CMD%"==".exit" goto start
git %CMD%
goto start

:exit
popd
exit /b