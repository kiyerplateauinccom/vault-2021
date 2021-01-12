export const environment = {
  production: true,
  environmentType: window["env"]["envType"],
  tokens: {
    mapBoxAccessToken: window["env"]["mapBoxAccessToken"] || "default",
    apiToken: window["env"]["apiToken"]
  },
  dates: {
    stringFormat: "M/D/YYYY h:mm A",
    jsonFormat: "YYYY-MM-DDTHH:mm:ss"
  },
  urls : {
    rooturl: window["env"]["rootUrl"] || "default",
    mapDataUrlPart: window["env"]["mapDataUrlPart"] || "default",
    startProccessingUrlPart: window["env"]["startProccessingUrlPart"] || "default",
    processingStatusUrlPart: window["env"]["processingStatusUrlPart"] || "default",
    s3BucketUrl: window["env"]["s3BucketUrl"] || "default"
  }
};





