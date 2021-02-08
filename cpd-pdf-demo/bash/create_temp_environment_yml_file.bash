#!/bin/bash


# Create the temporary conda environment.yml file
conda config --set env_prompt '({name})'
echo ""
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
echo -e "${Green}                Creating the temporary conda environment.yml file${NC}"
echo -e "${Green}-------------------------------------------------------------------------------${NC}"
CommandString="cd ${RepositoriesDirectory}/${RepositoryPath} & conda activate ${EnvironmentPath} & conda env export -f tmp_environment.yml & conda deactivate"
# echo $CommandString -ForegroundColor Yellow
cmd /c $CommandString '2>&1'