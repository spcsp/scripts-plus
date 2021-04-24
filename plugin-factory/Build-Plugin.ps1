<#
  .SYNOPSIS
      Build a StrokesPlus Plugin
  .DESCRIPTION
      This function build a StrokesPlus plugin from C# source files. Given the path
      to an input and a path to the output, a simple plugin can be built.
  .PARAMETER InputFile
      Specifies the StrokesPlus C# Plugin source file
  .PARAMETER OutputFile
      Specifies the StrokesPlus DLL Plugin output file
  .EXAMPLE
      Build-Plugin .\input.cs .\output.dll
          
      Description
      -----------
      Builds the plugin.
  .NOTES
      FunctionName    : Build-Plugin
      Created by      : Kevin Hill
  .LINK
      How To Write PowerShell Function’s Or CmdLet’s Help (Fast)
      https://gallery.technet.microsoft.com/scriptcenter/PSISELibraryps1-ec442972
#>

[CmdletBinding()] 
  
param(
  [Parameter(Mandatory=$true)][string]$InputFile,
  [Parameter(Mandatory=$true)][string]$OutputFile
)

csc.exe `
  -nologo `
  -target:library `
  -out:$OutputFile `
  -lib:"C:\Program Files\StrokesPlus.net" `
  -reference:ClearScript.V8.dll,ClearScript.Core.dll `
  $InputFile
