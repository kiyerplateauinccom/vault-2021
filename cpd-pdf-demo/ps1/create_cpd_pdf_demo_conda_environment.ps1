
# You have to manually stop the jupyter server before you run this in a PowerShell window
# if you are deleting the environment before recreating it.
# From the Anaconda Powershell Prompt (anaconda3), run:
# 
# cd $Env:UserProfile\Documents\Repositories\vault-2021\cpd-pdf-demo\ps1
# cls
# .\create_cpd_pdf_demo_conda_environment.ps1

# Set up global variables
$DisplayName = "CPD PDF Demo"
$RepositoryPath = "vault-2021\cpd-pdf-demo"
$EnvironmentName = "cpd_env"

$HomeDirectory = $Env:UserProfile
$EnvironmentsDirectory = "${HomeDirectory}\anaconda3\envs"
$RepositoriesDirectory = "${HomeDirectory}\Documents\Repositories"
$PowerScriptsDirectory = "${RepositoriesDirectory}\${RepositoryPath}\ps1"
$EnvironmentPath = "${RepositoriesDirectory}\${RepositoryPath}\${EnvironmentName}"
$OldPath = Get-Location

# Delete environment folder
# Comment this out if you haven't changed the environment.yml file in a while
# ."${PowerScriptsDirectory}\delete_conda_environment.ps1"

# Create environment folder
# ."${PowerScriptsDirectory}\create_conda_environment.ps1"
."${PowerScriptsDirectory}\update_conda_environment.ps1"

# Bring up the workspace in a web browser
."${PowerScriptsDirectory}\view_lab_in_firefox.ps1"

cd $OldPath