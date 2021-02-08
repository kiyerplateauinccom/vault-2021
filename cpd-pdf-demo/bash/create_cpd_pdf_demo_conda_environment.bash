#!/bin/bash


# You have to manually stop the jupyter server before you run this in a bash terminal
# if you are deleting the environment before recreating it.
# From the JupyterLab Terminal, run:
# 
# cd ~/cpd-pdf-demo/bash
# clear
# source create_cpd_pdf_demo_conda_environment.bash

# Set up global variables
DisplayName="CPD PDF Demo"
RepositoryPath="cpd-pdf-demo"
EnvironmentName="cpd_env"

RepositoriesDirectory="${HOME}"
BashScriptsDirectory="${RepositoriesDirectory}/${RepositoryPath}/bash"
EnvironmentPath="${RepositoriesDirectory}/${RepositoryPath}/${EnvironmentName}"
OldPath=$(pwd)

# Delete environment folder
# Comment this out if you haven't changed the environment.yml file in a while
#source "$BashScriptsDirectory/delete_conda_environment.bash"

# Create environment folder
source create_conda_environment.bash
#source "$BashScriptsDirectory/update_conda_environment.bash"

# Bring up the workspace in Chrome
# bash view_lab_in_chrome.bash

# Bring up the flaskr app in Chrome
# bash view_flaskr_in_chrome.bash

cd "$OldPath"