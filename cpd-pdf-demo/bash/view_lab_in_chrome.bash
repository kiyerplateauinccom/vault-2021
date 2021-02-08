#!/bin/bash


source function_definitions.bash

TokenString=Get-Token-String
If ($TokenString -Eq "") {
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	echo -e "${Green}             Launching the Jupyter server in its own window${NC}"
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	# $argList="jupyter lab --no-browser --config=${HOME}/.jupyter/jupyter_notebook_config.py --notebook-dir=${RepositoriesDirectory}"
	$argList="${RepositoriesDirectory}/${RepositoryPath}/${EnvironmentName}/Scripts/jupyter-lab.exe --no-browser --config=${HOME}/.jupyter/jupyter_notebook_config.py --notebook-dir=${RepositoriesDirectory}"
	echo "${argList}" -ForegroundColor Yellow
	Start-Process BashShell -argumentlist $argList
	Read-Host "Verify the Jupyter server is running, then press ENTER to continue..source 
	$TokenString=Get-Token-String
}

# Open the webpage in Chrome
If ($TokenString -Ne ") {
	echo ""
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	echo -e "${Green}                          Opening the workspace in Chrome${NC}"
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	# All other workspaces have a name that is part of the URL:
	# http(s)://<server:port>/<lab-location>/lab/workspaces/foo
	Start-Process "chrome.exe" "http://localhost:8888/lab/workspaces/${EnvironmentName}"
}