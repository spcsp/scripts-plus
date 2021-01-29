@echo off
cls
pushd %~dp0
call pack.bat
dotnet msbuild -nologo -p:Configuration=Debug ScriptsPlusPlugin.csproj
dotnet msbuild -nologo -p:Configuration=Release ScriptsPlusPlugin.csproj
popd
rem timeout /T 3