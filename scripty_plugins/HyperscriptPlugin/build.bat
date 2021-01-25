cls
@echo off
@pushd %~dp0
set DLL_NAME=HyperscriptPlugin.dll
del %DLL_NAME%
call npx browserify --standalone h --plugin tinyify --entry index.js --outfile Properties/h.js
call dotnet msbuild -p:Configuration=Release HyperscriptPlugin.csproj
xcopy /S /Q /Y /F bin\Release\%DLL_NAME%
@popd
call install.bat