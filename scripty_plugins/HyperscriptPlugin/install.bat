cls
@echo off
@pushd %~dp0
xcopy /S /Q /Y /F .\HyperscriptPlugin.dll "C:\Program Files\StrokesPlus.net\Plug-Ins\"
@popd