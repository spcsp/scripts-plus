cls
@echo off
pushd %~dp0
for %%I in (.) do set CurrDirName=%%~nxI
set PROJ=%CurrDirName%.csproj
echo Found %PROJ%, building for %1
dotnet msbuild -nologo -p:Configuration=%1 %PROJ%
timeout /T 3
popd