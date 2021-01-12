import * as mapboxgl from "mapbox-gl";
import * as GeoJSON from "geojson";

export class Satellite {
  public constructor() {}
  noradCatNumber: string;
}

export class Property {
  constructor() {
    this.satellites = [];
  }
  id: unknown;
  time: Date;
  mmsiNumber: number;
  vesselName: string;
  callSign: string;
  satellites: Satellite[];
}

export class FeaturesCollection
  implements GeoJSON.FeatureCollection<GeoJSON.Point, Property> {
  constructor() {
    this.features = [];
  }
  type: "FeatureCollection";
  features: GeoJSON.Feature<GeoJSON.Point, Property>[];
  bbox?: GeoJSON.BBox;
}

export class AppFeature implements GeoJSON.Feature<GeoJSON.Point, Property> {
  constructor() {
    this.geometry = new appGeometry();
  }
  type: "Feature";
  geometry: appGeometry;
  id?: string | number;
  properties: Property;
  bbox?: GeoJSON.BBox;
}

export class appGeometry implements GeoJSON.Point {
  constructor() {
    this.coordinates = [];
  }
  type: "Point";
  coordinates: GeoJSON.Position;
  bbox?: GeoJSON.BBox;
}
