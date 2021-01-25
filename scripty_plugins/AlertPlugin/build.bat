cls
@echo off
@pushd %~dp0
set DLL_NAME=HyperscriptPlugin.dll
del %DLL_NAME%
call dotnet msbuild -p:Configuration=Release
xcopy /S /Q /Y /F bin\Release\%DLL_NAME%
@popd
call install.bat