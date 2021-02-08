#!/bin/bash


# From the JupyterLab Terminal, run:
# 
# cd cpd-pdf-demo/bash
# cls
# bash test_cpd_pdf_demo_flask_app.bash
# 
# Or, just run it from another BashShell script:
# $argList="-file `"$RepositoriesDirectory/$RepositoryPath/bash/test_cpd_pdf_demo_flask_app.bash`""
# Start-Process powershell -argumentlist $argList

# Set up global variables
RepositoryPath="cpd-pdf-demo"
EnvironmentName="cpd"

RepositoriesDirectory="${HOME}"
AppName="flaskr"

echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}                          Activating the ${EnvironmentName} environment${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
cd "${RepositoriesDirectory}/${RepositoryPath}/${AppName}"
conda activate $RepositoriesDirectory/$RepositoryPath/$EnvironmentName
env:FLASK_DEBUG='1'
env:FLASK_APP=$AppName
env:FLASK_ENV='development'

echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}       Running the test from the ${RepositoryPath} repository${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
pytest -vv --exitfirst