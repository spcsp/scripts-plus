@echo off
set EXE=C:\Program Files\StrokesPlus.net\StrokesPlus.net.exe
set CWD=%~dp0
set OUTFILE=%CWD%..\@types\strokesplus.net\index.d.ts
set GENERATOR=%CWD%dtsGenerator.js

echo Parsing `sp.getMethods()` and writing TypeScript declaration file
"%EXE%" --script="eval(File.ReadAllText(String.raw`%GENERATOR%`))(String.raw`%OUTFILE%`);"
echo Wrote to %OUTFILE%
timeout /T 3