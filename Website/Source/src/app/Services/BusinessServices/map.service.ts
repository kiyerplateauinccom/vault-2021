import { Injectable, EventEmitter } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { environment } from "../../../environments/environment";
import { MapEventType, EventData } from "mapbox-gl";

@Injectable({
  providedIn: "root"
})
export class MapService {
  mapgl: mapboxgl.Map;

  mapLoaded: EventEmitter<mapboxgl.Map> = new EventEmitter();

  private readonly outdoorStyle = "mapbox://styles/mapbox/navigation-guidance-day-v4"; // "mapbox://styles/mapbox/outdoors-v11";

  constructor() {}

  createMap(containerName: string): void {
    if (!this.mapgl) {
      let lng = -90;
      let lat = 45;

      this.mapgl = new mapboxgl.Map({
        accessToken: environment.tokens.mapBoxAccessToken,
        container: containerName,
        style: this.outdoorStyle,
        zoom: 1.885,
        center: [lng, lat],
        attributionControl: false
      });

      // Add map controls
      // Add map controls
      this.mapgl.addControl(
        new mapboxgl.NavigationControl({
          showCompass: true,
          showZoom: true,
          visualizePitch: false
        })
      );

      this.mapgl.on("load", event => {
        this.mapLoaded.emit(this.mapgl);
      });
    }
  }

  removeLayer(layerName: string): void {
    const thisLayer = this.mapgl.getLayer(layerName);
    if (thisLayer !== null && thisLayer !== undefined){
      this.mapgl.removeLayer(layerName);
    }
  }
  removeSource(sourceName: string): void {
    const thisSource = this.mapgl.getLayer(sourceName);
    if (thisSource !== null && thisSource !== undefined){
      this.mapgl.removeSource(sourceName);
    }
  }

  addLineSource(sourceName: string, coordinates: any[]) {
    this.mapgl.addSource(sourceName, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates
        }
      }
    });
  }

  addSource(
    sourceName: string,
    dataSource: any,
    isCluster: boolean,
    clusterMaxZoom: number,
    clusterRadius: number
  ): void {
    this.mapgl.addSource(sourceName, {
      type: "geojson",
      // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazardsng  program.
      data: dataSource,
      cluster: isCluster,
      clusterMaxZoom: clusterMaxZoom, // Max zoom to cluster points on
      clusterRadius: clusterRadius // Radius of each cluster when clustering points (defaults to 50)
    });
  }

  addLayer(layer: any): void {
    this.mapgl.addLayer(layer);
  }

  addClickEvent(layerId: string, event): void {
    this.mapgl.on("click", layerId, event);
  }

  addMouseEnter(layerId: string, event): void {
    this.mapgl.on("mouseenter", layerId, event);
  }

  addMouseLeave(layerId: string, event): void {
    this.mapgl.on("mouseleave", layerId, event);
  }

  addPopup(coordinates, html: string): void {
    new mapboxgl.Popup()
      .setMaxWidth("500")
      .setLngLat(coordinates)
      .setHTML(html)
      .addTo(this.mapgl);
  }
}
