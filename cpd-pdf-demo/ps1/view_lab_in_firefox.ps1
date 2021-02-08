
."${RepositoriesDirectory}\${RepositoryPath}\ps1\function_definitions.ps1"

$TokenString = Get-Token-String
If ($TokenString -Eq "") {
	Write-Host "-------------------------------------------------------------------------------" -ForegroundColor Green
	Write-Host "             Launching the Jupyter server in its own window" -ForegroundColor Green
	Write-Host "-------------------------------------------------------------------------------" -ForegroundColor Green
	$argList = "jupyter lab --no-browser --config=${HomeDirectory}\.jupyter\jupyter_notebook_config.py --notebook-dir=${RepositoriesDirectory}"
	# $argList = "${RepositoriesDirectory}\${RepositoryPath}\${EnvironmentName}\Scripts\jupyter-lab.exe --no-browser --config=${HomeDirectory}\.jupyter\jupyter_notebook_config.py --notebook-dir=${RepositoriesDirectory}"
	Write-Host "${argList}" -ForegroundColor Yellow
	Start-Process PowerShell -argumentlist $argList
	Read-Host "Verify the Jupyter server is running, then press ENTER to continue..."
	$TokenString = Get-Token-String
}

# Open the webpage in Firefox
If ($TokenString -Ne "") {
	Write-Host ""
	Write-Host "-------------------------------------------------------------------------------" -ForegroundColor Green
	Write-Host "                          Opening the workspace in Firefox" -ForegroundColor Green
	Write-Host "-------------------------------------------------------------------------------" -ForegroundColor Green
	# All other workspaces have a name that is part of the URL:
	# http(s)://<server:port>/<lab-location>/lab/workspaces/foo
	Start-Process "C:\Program Files\Mozilla Firefox\firefox.exe" "http://localhost:8888/lab/workspaces/${EnvironmentName}"
}