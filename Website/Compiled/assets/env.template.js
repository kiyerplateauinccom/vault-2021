(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["mapBoxAccessToken"] = "${MAPBOX_ACCESS_TOKEN}"
    window["env"]["rootUrl"] = "${ROOT_URL}"
    window["env"]["mapDataUrlPart"] = "${MAP_DATA_URL}"
    window["env"]["startProccessingUrlPart"] = "${START_PROCESSING_URL_PART}"
    window["env"]["processingStatusUrlPart"] = "${PROCESSING_STATUS_URL_PART}"
    window["env"]["s3BucketUrl"] = "${PROCESSING_STATUS_URL_PART}"
    window["env"]["apiToken"] = "${API_TOKEN}"
    window["env"]["envType"] = "${ENVIRONMENT_TYPE}"
  })(this);
  