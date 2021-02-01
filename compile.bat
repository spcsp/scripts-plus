@echo off
cls
pushd %~dp0
dotnet msbuild -nologo -p:Configuration=Release ScriptsPlusPlugin.csproj
popd
rem timeout /T 3