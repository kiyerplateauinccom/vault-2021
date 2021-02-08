
# From the Anaconda Powershell Prompt (anaconda3), run:
# 
# cd $Env:UserProfile\Documents\Repositories\vault-2021\CPD_PDF_Demo\ps1
# cls
# .\create_cpd_pdf_demo_temp_environment_yml_file.ps1

# Set up global variables
$DisplayName = "CPD PDF Demo"
$RepositoryPath = "vault-2021\CPD_PDF_Demo"
$EnvironmentName = "cpd"
# $EnvironmentName = "arcgispro-py3"
$HomeDirectory = $Env:UserProfile
$EnvironmentsDirectory = "${HomeDirectory}\anaconda3\envs"
$RepositoriesDirectory = "${HomeDirectory}\Documents\Repositories"
$PowerScriptsDirectory = "${RepositoriesDirectory}\${RepositoryPath}\ps1"
$EnvironmentPath = "${RepositoriesDirectory}\${RepositoryPath}\${EnvironmentName}"
# $EnvironmentPath = "${RepositoriesDirectory}\${RepositoryPath}\ArcGIS_Pro\${EnvironmentName}"
$OldPath = Get-Location

."${RepositoriesDirectory}\${RepositoryPath}\ps1\create_temp_environment_yml_file.ps1"

Write-Host ""
Write-Host "-------------------------------------------------------------------------------" -ForegroundColor Green
Write-Host "       Running Compare It! to compare the old and new yml files" -ForegroundColor Green
Write-Host "-------------------------------------------------------------------------------" -ForegroundColor Green
Start-Process "C:\Program Files (x86)\Compare It!\wincmp3.exe" -ArgumentList "${RepositoriesDirectory}\${RepositoryPath}\environment.yml ${RepositoriesDirectory}\${RepositoryPath}\tmp_environment.yml"

Write-Host ""
Write-Host "-------------------------------------------------------------------------------" -ForegroundColor Green
Write-Host "       Running Notepad++ so you can sort the new yml file" -ForegroundColor Green
Write-Host "-------------------------------------------------------------------------------" -ForegroundColor Green
Start-Process "C:\Program Files\Notepad++\notepad++.exe" -ArgumentList "${RepositoriesDirectory}\${RepositoryPath}\tmp_environment.yml"

cd $OldPath