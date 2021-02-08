#!/bin/bash


# Create the conda environment
cd "${RepositoriesDirectory}/${RepositoryPath}"
echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
# Assume here that if the environment folder is missing, the environment was already deleted
if [ -d "$EnvironmentPath" ];
then
	echo -e "${Green}$               Updating the ${DisplayName} conda environment (${EnvironmentName})${NC}"
else
	echo -e "${Green}               Creating the ${DisplayName} conda environment (${EnvironmentName})${NC}"
fi
echo -e "${Green}-------------------------------------------------------------------------------${NC}"

# You can control where a conda environment lives by providing a path to a target directory when creating the environment
conda env update --prefix $EnvironmentPath --file environment.yml --prune
conda info --envs