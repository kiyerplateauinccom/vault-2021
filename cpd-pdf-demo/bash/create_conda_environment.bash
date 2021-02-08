#!/bin/bash

source function_definitions.bash

OldPath=$(pwd)

# Update conda
conda deactivate
conda config --set auto_update_conda true
conda config --set report_errors false
# # You might have to un-comment this to compile some libraries
# echo ""
# echo -e "${Green}-------------------------------------------------------------------------------${NC}"
# echo -e "${Green}                             Installing m2w64-toolchain${NC}"
# echo -e "${Green}-------------------------------------------------------------------------------${NC}"
# conda install m2w64-toolchain --yes
# echo ""
# echo -e "${Green}-------------------------------------------------------------------------------${NC}"
# echo -e "${Green} Installing the package for run-time control of the Intel Math Kernel Library${NC}"
# echo -e "${Green}-------------------------------------------------------------------------------${NC}"
# conda install -c intel mkl-service --yes

# # You can force a re-download of your environment packages by un-commenting this out
# echo ""
# echo -e "${Green}-------------------------------------------------------------------------------${NC}"
# echo -e "${Green}              Removing all unused base conda packages and caches${NC}"
# echo -e "${Green}-------------------------------------------------------------------------------${NC}"
# conda clean --all --yes

echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}              Checking all base conda packages for potential updates${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
conda update --all --yes

# Update Node.js
echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}                Checking all NPM packages for potential updates${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
# npm cache clean
npm install -g npm
npm install -g node-gyp
npm update -g

# Create the conda environment
source update_conda_environment.bash

# Add the kernel to the Launcher
echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}                     Adding the kernel to the Launcher${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
add_python_executable_to_path $EnvironmentPath
add_kernel_to_launcher $RepositoriesDirectory $RepositoryPath $EnvironmentName $DisplayName
KernelPath="~/.local/share/jupyter/kernels/${EnvironmentName}/kernel.json"
if [ -f "$KernelPath" ]; then
	add_logos_to_kernel_folder $EnvironmentName $RepositoriesDirectory $RepositoryPath
	cat $KernelPath
fi

# Add a workspace file for bookmarking. You can create a temporary workspace file in the 
# ~/.jupyter/lab/workspaces folder by going to this URL:
# http://localhost:8888/lab/?clone=$EnvironmentName
echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}                        Importing the workspace file${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
WorkspacePath=$(import_workspace_file $RepositoriesDirectory $RepositoryPath)
cat $WorkspacePath

# Clean up the mess
echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}                          Cleaning the staging area${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
jupyter-lab clean
ExtensionsList=$(jupyter labextension list)
if [[ "$ExtensionsList" != *"No installed extensions"* ]]; then
	echo ""
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	echo -e "${Green}                     Updating the Jupyter Lab extensions${NC}"
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	jupyter labextension update --all
fi
echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}                       Rebuilding the Jupyter Lab assets${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
ConfigFolder=$(jupyter --config-dir)
OldConfigPath="${ConfigFolder}/old_jupyter_notebook_config.py"
if [ -f "$OldConfigPath" ]; then
	read -p "You better rescue your old_jupyter_notebook_config.py in the ${ConfigFolder} folder, we are about to overwrite it. Then press ENTER to continue.."
fi
NewConfigPath="${ConfigFolder}/jupyter_notebook_config.py"
mv $NewConfigPath $OldConfigPath
ConfigPath="${RepositoriesDirectory}/${RepositoryPath}/jupyter_notebook_config.py"
if [ -f "$ConfigPath" ]; then
	mv $ConfigPath $NewConfigPath
fi
jupyter-lab build

cd $OldPath