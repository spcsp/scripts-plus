<#
    .SYNOPSIS
        Inserts a full comment block
    .DESCRIPTION
        This function inserts a full comment block that is formatted the
        way I format all my comment blocks.
    .PARAMETER InstallMenu
        Specifies if you want to install this as a PSIE add-on menu
    .EXAMPLE
        New-CommentBlock -InstallMenu $true
            
        Description
        -----------
        Installs the function as a menu item.
    .NOTES
        FunctionName    : Build-StrokesPlusPlugin
        Created by      : Kevin Hill
        Date Coded      : 09/13/2011 13:37:24
        Modified by     : Dejan Mladenovic
        Date Modified   : 02/09/2019 01:19:10
        More info       : https://improvescripting.com/
    .LINK
        How To Write PowerShell Function’s Or CmdLet’s Help (Fast)
        https://gallery.technet.microsoft.com/scriptcenter/PSISELibraryps1-ec442972
#>

[CmdletBinding()] 
  
# param(
#   [Parameter(Mandatory=$true)][string]$InputPath,
#   [Parameter(Mandatory=$true)][string]$OutputPath
# )

$BuildScript = Join-Path $PSScriptRoot "Build-Plugin.ps1"

# $ResolvedInputPath = Resolve-Path $InputPath
$ResolvedInputPath = Join-Path $PSScriptRoot "src"

Write-Host (
  "`nSearching " + $ResolvedInputPath + "\*.cs"
) -ForegroundColor "Magenta"

Get-ChildItem (Resolve-Path $ResolvedInputPath) | 
Foreach-Object {
  Write-Host ("`n* Discovered " + $_.Name) -ForegroundColor "Yellow"
  
  $InputFile = $_.FullName  
  $OutputFolder = Join-Path $PSScriptRoot "dist"
  $OutputFile = Join-Path $OutputFolder ($_.BaseName + ".dll")
  
  Write-Host (" >> Reading >> " + $InputFile) -ForegroundColor "Blue"
  
  pwsh $BuildScript $InputFile $OutputFile 
  
  Write-Host (" << Writing << " + $OutputFile) -ForegroundColor "Green"
}