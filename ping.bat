cls
pushd %~dp0
node ping.js & timeout /T 5
popd
