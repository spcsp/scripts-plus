@echo off
cls
pushd %~dp0
call pack.bat
call compile.bat
popd
rem timeout /T 3