#!/bin/bash

NC='\033[0m' # No Color
Black='\033[0;30m'
DarkGray='\033[1;30m'
Red='\033[0;31m'
LightRed='\033[1;31m'
Green='\033[0;32m'
LightGreen='\033[1;32m'
BrownOrange='\033[0;33m'
Yellow='\033[1;33m'
Blue='\033[0;34m'
LightBlue='\033[1;34m'
Purple='\033[0;35m'
LightPurple='\033[1;35m'
Cyan='\033[0;36m'
LightCyan='\033[1;36m'
LightGray='\033[0;37m'
White='\033[1;37m'

conda init bash


add_python_executable_to_path() {
	EnvironmentPath=$1
	if [ perl -e 'exit(!(grep(m{^'"$EnvironmentPath"'$},split(":", $ENV{PATH}))) > 0)' ]; then
		# echo "Your path is missing ~/bin, you might want to add itsource 
		export PATH="$EnvironmentPath:$PATH"
	fi
}

add_kernel_to_launcher() {
	RepositoriesDirectory=$1
	RepositoryPath=$2
	EnvironmentName=$3
	DisplayName=$4
	
	conda activate $RepositoriesDirectory/$RepositoryPath/$EnvironmentName
	
	# Fix LookupError: unknown encoding: cp65001
	python -c "import os; os.environ['PYTHONIOENCODING']='UTF-8'"
	
	PythonVersion=`$(echo python --version)`
	python -m ipykernel install --user --name $EnvironmentName --display-name "$DisplayName ($PythonVersion)"
	conda deactivate
}

function add_logos_to_kernel_folder() {
	EnvironmentName=$1
	RepositoriesDirectory=$2
	RepositoryPath=$3
	KernelFolder="~/.local/share/jupyter/kernels/${EnvironmentName}"
	LogoFolder="${RepositoriesDirectory}/${RepositoryPath}/saves/png"
	SmallPath="${LogoFolder}/logo-32x32.png"
	if [ -f "$SmallPath" ]; then
		cp $SmallPath $KernelFolder
	fi
	LargePath="${LogoFolder}/logo-64x64.png"
	if [ -f "$LargePath" ]; then
		Copy-Item $LargePath -Destination $KernelFolder
	fi
}

function import_workspace_file() {
	RepositoriesDirectory=$1
	RepositoryPath=$2
	cd "${RepositoriesDirectory}/${RepositoryPath}"
	local WorkspacePath=$(jupyter-lab workspaces import workspace.json | cut -d' ' -f 3)
	
	echo "$WorkspacePath"
}

function get_token_string {
	local RuntimeFolder=$(jupyter --runtime-dir)
	local LatestJpserver=$(ls -t $RuntimeFolder/nbserver-*.json | head -1)
	local LatestJson=$(cat $LatestJpserver)
	local RegexPattern='(.*)"pid": ([0-9]+)(.*)'
	[[ "$LatestJson" =~ $RegexPattern ]]
	
	echo "${BASH_REMATCH[2]}"
}