
# Create the temporary conda environment.yml file
conda config --set env_prompt '({name})'
Write-Host ""
Write-Host "-------------------------------------------------------------------------------" -ForegroundColor Green
Write-Host "                Creating the temporary conda environment.yml file" -ForegroundColor Green
Write-Host "-------------------------------------------------------------------------------" -ForegroundColor Green
$CommandString = "cd ${RepositoriesDirectory}\${RepositoryPath} & conda activate ${EnvironmentPath} & conda env export -f tmp_environment.yml & conda deactivate"
# Write-Host $CommandString -ForegroundColor Yellow
cmd /c $CommandString '2>&1'