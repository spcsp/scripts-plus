cls
pushd %~dp0
for %%I in (.) do set CurrDirName=%%~nxI
dotnet msbuild -p:Configuration=Release %CurrDirName%.csproj
popd