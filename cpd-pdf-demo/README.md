# CPD PDF Demo

## TODO List
- Mock up some PDF forms with data (so that we’re mimicking the Airfield Survey dataset that we know the client would like to use this capability for)
- Develop a solution to take raw PDF files > Parse out key information > Insert information into a SQL Server database
- Build out the CPD APIs
- Have the user upload the raw PDF files in an S3 bucket
- Have the user then submit an API request with a list of the files they would like parsed
- Return a response when the data is available in the database
- Query the raw PDF files (in S3) using key words to lookup information

## Requirements
- The raw PDF files include both structured data (in varying templates) and images