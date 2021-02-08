#!/bin/bash


# From the JupyterLab Terminal, run:
# 
# cd cpd-pdf-demo/bash
# cls
# bash create_cpd_pdf_demo_temp_environment_yml_file.bash

# Set up global variables
DisplayName="CPD PDF Demo"
RepositoryPath="cpd-pdf-demo"
EnvironmentName="cpd"
# $EnvironmentName="arcgispro-py3"

EnvironmentsDirectory="${CONDA_DIR}/envs"
RepositoriesDirectory="${HOME}"
BashScriptsDirectory="${RepositoriesDirectory}/${RepositoryPath}/bash"
EnvironmentPath="${RepositoriesDirectory}/${RepositoryPath}/${EnvironmentName}"
# $EnvironmentPath="${RepositoriesDirectory}/${RepositoryPath}/ArcGIS_Pro/${EnvironmentName}"
OldPath=$(pwd)

bash bash/create_temp_environment_yml_file.bash

echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}       Running Compare It! to compare the old and new yml files${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
Start-Process "C:/Program Files (x86)/Compare It!/wincmp3.exe" -ArgumentList "${RepositoriesDirectory}/${RepositoryPath}/environment.yml ${RepositoriesDirectory}/${RepositoryPath}/tmp_environment.yml"

echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}       Running Notepad++ so you can sort the new yml file${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
Start-Process "C:/Program Files/Notepad++/notepad++.exe" -ArgumentList "${RepositoriesDirectory}/${RepositoryPath}/tmp_environment.yml"

cd $OldPath