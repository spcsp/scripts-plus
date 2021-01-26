@echo off
pushd %~dp0
for /D %%i in (build.bat) do echo %%i
popd
pause