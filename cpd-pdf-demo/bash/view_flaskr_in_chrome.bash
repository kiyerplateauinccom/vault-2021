#!/bin/bash


# From the JupyterLab Terminal, run:
# 
# cd cpd-pdf-demo/bash
# cls
# bash view_flaskr_in_chrome.bash

# Launch Flaskr App
FlaskrUrl="http://localhost:5000"
HttpRequest=[System.Net.WebRequest]::Create($FlaskrUrl)
HttpStatus=500
try {
	$HttpResponse=$HttpRequest.GetResponse()
	$HttpStatus=[int]$HttpResponse.StatusCode
}
catch [System.Management.Automation.MethodInvocationException] {
	echo ""
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	echo -e "${Green}              Launching the flaskr app in its own window${NC}"
	echo -e "${Green}-------------------------------------------------------------------------------${NC}"
	$argList="-file `"$BashScriptsDirectory/launch_cpd_pdf_demo_flask_app.bash`" -NoExit"
	Start-Process BashShell -argumentlist $argList
	Read-Host "Verify the Flask server is running, then press ENTER to continue..source 
}
finally {
	If ($HttpResponse -ne $null) {
		$HttpResponse.Close()
	}
}

# Open the webpage in Chrome
HttpRequest=[System.Net.WebRequest]::Create($FlaskrUrl)
try {
	$HttpResponse=$HttpRequest.GetResponse()
	$HttpStatus=[int]$HttpResponse.StatusCode
	If ($HttpStatus -eq 200) {
		echo "
		echo -e "${Green}-------------------------------------------------------------------------------${NC}"
		echo -e "${Green}                  Opening the flaskr app in Chrome${NC}"
		echo -e "${Green}-------------------------------------------------------------------------------${NC}"
		Start-Process "chrome.exe" $FlaskrUrl
	}
}
catch [System.Management.Automation.MethodInvocationException] {
	echo "Ran into an issue: ${PSItem} Check the debug output in the flaskr app window." -ForegroundColor Red
}
finally {
	If ($HttpResponse -ne $null) {
		$HttpResponse.Close()
	}
}