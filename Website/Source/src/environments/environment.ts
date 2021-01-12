// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentType: "prod",
  tokens: {
    mapBoxAccessToken:
      "pk.eyJ1IjoidXNhY3JjIiwiYSI6ImNrN2dtaHNweTAxNzMzZnA5eWR3MzBmcTkifQ.qsaIgRHPqAHu2chv9Y7sCw",
      apiToken: "xALDIUUBYGaAp1hvaXSvu7LTG0lf721N6Lh3StaS"
  },
  dates: {
    stringFormat: "M/D/YYYY h:mm A",
    jsonFormat: "YYYY-MM-DDTHH:mm:ss"
  },
  urls : {
    rooturl: "https://bpblbpka2a.execute-api.us-east-2.amazonaws.com",
    mapDataUrlPart: "data",
    startProccessingUrlPart: "datapipelinetrigger",
    processingStatusUrlPart: "progress",
    s3BucketUrl: "https://afdata.s3.us-gov-west-1.amazonaws.com/index.html"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

