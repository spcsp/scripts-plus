cls
@echo off
pushd %~dp0
echo ===========
echo ==  NPM  ==
echo ===========
echo.
set /P CMD="npm> "
npm %CMD%
popd
exit /b