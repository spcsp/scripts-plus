cls
pushd %~dp0
npx browserify --standalone h --plugin tinyify --output Properties/h.js
popd
pause