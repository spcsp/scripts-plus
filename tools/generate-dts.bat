@echo off
cls
rem pushd %~dp0
"C:\Program Files\StrokesPlus.net\StrokesPlus.net.exe" --script="clip.SetText('what')" 
rem "C:\Program Files\StrokesPlus.net\StrokesPlus.net.exe" --script="eval(File.ReadAllText('./dtsGenerator.js'));generateDts();" 
pause
rem popd