#!/bin/bash


# From the JupyterLab Terminal, run:
# 
# cd cpd-pdf-demo/bash
# cls
# bash test.bash

# echo colors:
# Black, DarkBlue, DarkGreen, DarkCyan, DarkRed, DarkMagenta,
# DarkYellow, Gray, DarkGray, Blue, Green, Cyan, Red, Magenta, Yellow, White

[string]$HOME="${HOME}"
[string]$RepositoriesDirectory="${HOME}"
[string]$RepositoryPath="cpd-pdf-demo"
[string]$EnvironmentName="cpd"

source function_definitions.bash

OldPath=$(pwd)

echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}           Setting environment for using the GDAL Utilities${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
CommandString="C:/Program Files/GDAL/GDALShell.bat"
cmd /k $CommandString '2>&1'

cd $OldPath