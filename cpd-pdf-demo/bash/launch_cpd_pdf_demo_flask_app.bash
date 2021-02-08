#!/bin/bash


# From the JupyterLab Terminal, run:
# 
# cd cpd-pdf-demo/bash
# cls
# bash launch_cpd_pdf_demo_flask_app.bash
# 
# Or, just run it from another BashShell script:
# $argList="-file `"$RepositoriesDirectory/$RepositoryPath/bash/launch_cpd_pdf_demo_flask_app.bash`""
# Start-Process powershell -argumentlist $argList

# Set up global variables
RepositoryPath="cpd-pdf-demo"
EnvironmentName="cpd"

RepositoriesDirectory="${HOME}"
EnvironmentPath="${RepositoriesDirectory}/${RepositoryPath}/${EnvironmentName}"
env:FLASK_DEBUG='1'
env:FLASK_APP='flaskr'
# $env:FLASK_APP='../flaskr/app.py'
env:APP_CONFIG_FILE='config.py'
env:FLASK_ENV='development'
OldPath=$(pwd)

echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}              Activating the ${EnvironmentName} environment${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
cd "${RepositoriesDirectory}/${RepositoryPath}"
conda activate $RepositoriesDirectory/$RepositoryPath/$EnvironmentName

echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}          Initializing the flaskr db from the ${RepositoryPath} repository${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
python -m flask init-db
# $CommandString="${EnvironmentPath}/python.exe -m flask init-db"
# echo $CommandString -ForegroundColor Yellow
# cmd /c $CommandString '2>&1'

echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}       Running the flaskr app from the ${RepositoryPath} repository${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
python -m flask run --host localhost --port 5000

cd $OldPath