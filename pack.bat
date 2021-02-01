@echo off
cls
pushd %~dp0
npm run build
popd
timeout /T 3