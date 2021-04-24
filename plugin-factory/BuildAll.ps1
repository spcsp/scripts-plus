[CmdletBinding()] 

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
