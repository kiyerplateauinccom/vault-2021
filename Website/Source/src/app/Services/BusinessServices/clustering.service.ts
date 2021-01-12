import { Injectable } from "@angular/core";
import * as mapboxgl from "mapbox-gl";
import { GeoJSONSource } from "mapbox-gl";
import { MapService } from "./map.service";
import { IMapPopoverFormatter } from "../Interfaces/iMapPopoverFormatter";
import { CoordinateService } from "./coordinate.service";

@Injectable({
  providedIn: "root"
})
export class ClusteringService {
  private readonly datasourceId = "vesselHits";
  private readonly clusterId = "vesselClusters";
  private readonly clusterCountId = "cluster-count";
  private readonly unclusteredPointId = "unclustered-point";

  public popupFormmatter: IMapPopoverFormatter;

  constructor(
    private readonly mapService: MapService,
    private readonly coordinateService: CoordinateService
  ) {}

  addClustering(datasource: any): void {
    this.addDataSource(datasource);
    this.addClusterLayer();
    this.addClusterCountLayer();
    this.addUnclusteredLayer();
    this.addClusteredClickEvent();
    this.addUnClusteredClickEvent();
    this.addMouseEvents();
  }

  private addMouseEvents(): void {
    this.mapService.addMouseEnter(this.clusterId, () => {
      this.mapService.mapgl.getCanvas().style.cursor = "pointer";
    });
    this.mapService.addMouseLeave(this.clusterId, () => {
      this.mapService.mapgl.getCanvas().style.cursor = "";
    });

    this.mapService.addMouseEnter(this.unclusteredPointId, () => {
      this.mapService.mapgl.getCanvas().style.cursor = "pointer";
    });
    this.mapService.addMouseLeave(this.unclusteredPointId, () => {
      this.mapService.mapgl.getCanvas().style.cursor = "";
    });
  }

  private addClusterLayer(): void {
    this.mapService.addLayer({
      id: this.clusterId,
      type: "circle",
      source: this.datasourceId,
      filter: ["has", "point_count"],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#096175",
          25,
          "#a1c276",
          50,
          "#e8eb34",
          100,
          "#f0b241",
          300,
          "#cf681f",
          500,
          "#8c47c4",
          1000,
          "#9c4141"
        ],
        "circle-radius": [
          "step",
          ["get", "point_count"],
          16,
          25,
          20,
          50,
          24,
          100,
          28,
          250,
          32,
          500,
          36,
          1000,
          40
        ]
      }
    });
  }

  private addClusterCountLayer(): void {
    this.mapService.addLayer({
      id: this.clusterCountId,
      type: "symbol",
      source: this.datasourceId,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
      }
    });
  }

  private addUnclusteredLayer(): void {
    this.mapService.addLayer({
      id: this.unclusteredPointId,
      type: "circle",
      source: this.datasourceId,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#11b4da",
        "circle-radius": 6,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff"
      }
    });
  }

  private addClusteredClickEvent(): void {
    // inspect a cluster on click
    this.mapService.addClickEvent(this.clusterId, e => {
      var features = this.mapService.mapgl.queryRenderedFeatures(e.point, {
        layers: [this.clusterId]
      });

      var clusterId = features[0].properties.cluster_id;
      let source = this.mapService.mapgl.getSource(
        this.datasourceId
      ) as GeoJSONSource;

      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;
        const record = features[0] as any;
        this.mapService.mapgl.easeTo({
          center: record.geometry.coordinates,
          zoom: zoom
        });
      });
    });
  }

  private addUnClusteredClickEvent(): void {
    //// When a click event occurs on a feature in
    //// the unclustered-point layer, open a popup at
    //// the location of the feature, with
    //// description HTML from its properties.
    if (this.popupFormmatter) {
      this.mapService.addClickEvent(this.unclusteredPointId, e => {
        var coordinates = this.coordinateService.getCoordinates(e);
        this.mapService.addPopup(coordinates, this.popupFormmatter.getHtml(e));
      });
    }
  }

  private addDataSource(datasource: any): void {
    this.mapService.addSource(this.datasourceId, datasource, true, 14, 25);
  }

  removeCluster(): void {
    this.mapService.removeLayer(this.unclusteredPointId);
    this.mapService.removeLayer(this.clusterId);
    this.mapService.removeLayer(this.clusterCountId);
    this.mapService.removeSource(this.datasourceId);
  }

  rebuildCluster(datasource: any): void {
    this.removeCluster();
    this.addClustering(datasource);
  }
}
