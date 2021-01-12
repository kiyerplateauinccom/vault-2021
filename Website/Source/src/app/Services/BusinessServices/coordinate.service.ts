import { Injectable } from "@angular/core";
import * as mapboxgl from "mapbox-gl";

@Injectable({
  providedIn: "root"
})
export class CoordinateService {
  constructor() {}

  getCoordinates(evetArgs: any): mapboxgl.LngLat {
    const feature = evetArgs.features[0] as any;
    var coordinates = feature.geometry.coordinates.slice();

    while (Math.abs(evetArgs.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += evetArgs.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    return new mapboxgl.LngLat(coordinates[0], coordinates[1]);
  }
}
