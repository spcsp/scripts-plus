@echo off
cls
pushd "%~dp0"
dotnet msbuild -p:Configuration=Release ScriptsPlusPlugin.csproj
popd
timeout /T 3