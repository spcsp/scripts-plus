@echo off
cls
pushd %~dp0
npm run build & pause
popd