import { Injectable } from "@angular/core";
import {
  FeaturesCollection,
  appGeometry,
  AppFeature
} from "../../objects/featureSet";
import { MapService } from "./map.service";
import { UtilityService } from "./utility.service";
import { FilterService } from "./filter.service";

@Injectable({
  providedIn: "root"
})
export class LineService {
  private sourceLayers: SourceLayer[];

  constructor(
    private readonly mapService: MapService,
    private readonly utilityService: UtilityService,
    private readonly filterService: FilterService
  ) {
    this.sourceLayers = [];
  }

  drawLines(collection: FeaturesCollection): void {
    let clone = this.utilityService.deepCopy<FeaturesCollection>(collection);
    // get unique vessel names
    let unique = [...new Set(clone.features.map(x => x.properties.mmsiNumber))];

    clone.features = this.filterService.sorteOnDate(clone);

    let index = 1;
    unique.forEach(id => {
      let coordinates = this.getCoordinates(clone, id);
      let sourceName = this.getSourceName(index, "_Sournce");
      let layerName = this.getlayerName(index, "_Layer");
      this.mapService.addLineSource(sourceName, coordinates);
      this.mapService.addLayer(this.getLayer(sourceName, layerName));
      this.sourceLayers.push(new SourceLayer(layerName, sourceName));

      index++;
    });
  }

  private getCoordinates(collection: FeaturesCollection, id: number): any[] {
    // filter list on each vesselName
    let items = collection.features.filter(x => x.properties.mmsiNumber == id);

    let coordinates: any[] = [];
    items.forEach(item => {
      let set: any[] = [];
      set.push(item.geometry.coordinates[0]);
      set.push(item.geometry.coordinates[1]);
      coordinates.push(set);
    });

    return coordinates;
  }

  private getLayer(sourceName: string, layerName: string): any {
    return {
      id: layerName,
      type: "line",
      source: sourceName,
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#101552",
        "line-width": 2
      }
    };
  }

  private getSourceName(index: number, additionalName: string): string {
    return "lineSource" + additionalName.replace(" ", "") + index.toString();
  }

  private getlayerName(index: number, additionalName: string): string {
    return "lineLayer" + additionalName.replace(" ", "") + index.toString();
  }

  clear(): void {
    this.sourceLayers.forEach(x => {
      this.mapService.removeLayer(x.layerName);
      this.mapService.removeSource(x.sourceName);
    });
    this.sourceLayers = [];
  }
}

export class SourceLayer {
  public constructor(public readonly layerName, public readonly sourceName) {}
}
