@echo off
cls
pushd %~dp0
for %%I in (.) do set CurrDirName=%%~nxI
call npm run build
call dotnet msbuild -nologo -p:Configuration=Release %CurrDirName%.csproj
popd
timeout /T 3