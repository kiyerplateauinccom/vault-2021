#!/bin/bash


source function_definitions.bash

# Delete environment
echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}               Deleting the ${DisplayName} conda environment (${EnvironmentName})${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
conda remove --name $EnvironmentName --all --yes

# You have to manually delete the folder if you don't manually stop the server
# `jupyter notebook stop 8888` Won't work on Windows as of 2020-11-19
If (Test-Path -Path $EnvironmentPath -PathType Container) {
	$TokenString=Get-Token-String
	If ($TokenString -Ne "") {
		Read-Host "Stop the Jupyter server manually, then press ENTER to continue..source 
	}
	echo "
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	echo -e "${Green}   Recursively removing ${EnvironmentPath}${NC}"
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	Remove-Item -Recurse -Force $EnvironmentPath
}

# Delete the kernel from the Launcher
KernelPath="~/.local/share/jupyter/kernels/${EnvironmentName}"
If (Test-Path -Path $KernelPath -PathType Container) {
	$TokenString=Get-Token-String
	If ($TokenString -Ne "") {
		Read-Host "Stop the Jupyter server manually, then press ENTER to continue..source 
	}
	echo "
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	echo -e "${Green}  Recursively removing ${KernelPath}${NC}"
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	Remove-Item -Recurse -Force $KernelPath
}
conda info --envs