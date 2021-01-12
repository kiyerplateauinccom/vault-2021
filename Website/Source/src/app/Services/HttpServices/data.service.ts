import { Injectable } from "@angular/core";
import { DateRange } from "../BusinessServices/datetime.service";
import { MapService } from "../BusinessServices/map.service";
import {
  FeaturesCollection,
  Satellite,
  AppFeature,
  Property
} from "../../objects/featureSet";

import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BuildStatus } from "../BusinessServices/session.service";
import { catchError, flatMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(
    private readonly mapService: MapService,
    private readonly httpClient: HttpClient
  ) {}

  public getDataLocation(dateRange: DateRange): Observable<FeaturesCollection> {
    let request = {
      "south_latitude": -90,
      "north_latitude": 90.0,
      "west_longitude": -180.0,
      "east_longitude": 180,
      "start_time": dateRange.startDateJson,
      "stop_time": dateRange.endDateJson
    };
     return this.httpClient.post<string>(this.getURl(environment.urls.mapDataUrlPart), JSON.stringify(request))
    .pipe(
      flatMap(result => {
        if(result !== null && result !== undefined && result !== ""){
          return this.httpClient.get<FeaturesCollection>(result).pipe(
            flatMap((x)=> {
               return of(x);}),
            catchError(err => {
              return of(null)
            }) 
          );
        }
        return of(null);
      })
    );
  }

  public getData(url: string):Observable<FeaturesCollection>{
    return this.httpClient.get<FeaturesCollection>(url);
  }

  public getBuildState(): Observable<BuildStatus> {
   
    return this.httpClient.get<BuildStatus>(this.getURl(environment.urls.processingStatusUrlPart))
    .pipe(
    
      flatMap(x=> { return of(Number(x));}),
      catchError(err=> {
          console.log("checking import status error:", err);
          return of(BuildStatus.Error);
    }));
  }

  public postStartBuild(): Observable<BuildStatus>{

    return this.getBuildState()
    .pipe(
    
      flatMap(x=> {
        
        if (x === BuildStatus.NotInstalled || x === null || x === undefined){
          return this.httpClient.post<BuildStatus>(this.getURl(environment.urls.startProccessingUrlPart), null);
        }
        return of (x)
      }),
      catchError(err=> {
          console.log("checking import status error:", err);
          return of(BuildStatus.Error);
    }));
  }

  private getURl(finalPart: string): string{
    return `${environment.urls.rooturl}/${environment.environmentType}/${finalPart}`
  }
}
