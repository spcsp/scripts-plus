cls
@echo off
pushd %~dp0
npm run build -- --watch
popd
timeout /T 3