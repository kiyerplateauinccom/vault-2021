import { Component, OnInit, AfterViewInit } from "@angular/core";
import { environment } from "src/environments/environment";
import * as mapboxgl from "mapbox-gl";
import { MomentDateTimeAdapter } from "ng-pick-datetime-moment";
import { Moment } from "moment/moment";
import * as moment from "moment";
import { Options, LabelType } from "ng5-slider";
import { ClusteringService } from "../Services/BusinessServices/clustering.service";
import { GeoJSONSource } from "mapbox-gl";
import { MapService } from "../Services/BusinessServices/map.service";
import { PopoverformatterService } from "../Services/BusinessServices/popoverformatter.service";
import { DatetimeService } from "../Services/BusinessServices/datetime.service";
import { FilterService } from "../Services/BusinessServices/filter.service";

import { DataService } from "../Services/HttpServices/data.service";
import { FeaturesCollection } from "../objects/featureSet";
import { LineService } from "../Services/BusinessServices/line.service";
import { SpinnerManagementService } from "../Services/BusinessServices/spinner-management.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  dt1: any;
  dt2: any;

  value: number = 0;

  options: Options;

  private originalFeatureCollection: FeaturesCollection;

  constructor(
    private readonly clusteringService: ClusteringService,
    private readonly dataService: DataService,
    private readonly filterService: FilterService,
    private readonly lineService: LineService,
    private readonly mapService: MapService,
    private readonly spinner: SpinnerManagementService,
    public readonly dateTimeService: DatetimeService,
    popoverformatterService: PopoverformatterService
  ) {
    this.clusteringService.popupFormmatter = popoverformatterService;
  }

  ngOnInit(): void {
    let fromMoment = moment(new Date(2014, 1, 1)).utc(true);
    let toMoment = moment(fromMoment.toString())
      .utc()
      .add(1, "hour");

    this.dateTimeService.initialize(fromMoment, toMoment, false);

    this.mapService.mapLoaded.subscribe(x => {
      this.LoadMap();
    });
  }

  ngAfterViewInit(): void {
    this.mapService.createMap("mapgl");
  }

  private LoadMap() {
    this.dataService
      .getDataLocation(this.dateTimeService.overallDateRange)
      .subscribe(dataSource => {
        
        if (dataSource){
          this.spinner.show();
          this.originalFeatureCollection = dataSource;

          let filtered = this.filterService.getFilteredCollection(
            this.dateTimeService.getRange(this.value),
            dataSource
          );
          this.lineService.drawLines(filtered);
          this.clusteringService.addClustering(filtered);
          this.spinner.hide();
        }
      
      });
  }

  search(): void {

    if (this.dateTimeService.overallDateRange.isStartDateLessThanEndDate) {
      this.value = 0;
      if (this.originalFeatureCollection){
        try {
          this.dateTimeService.rebuild(false);
        } catch {}
  
        try {
          this.clusteringService.removeCluster();
        } catch {}
        try {
          this.lineService.clear();
        } catch {}
      }
      this.dateTimeService.initialize(this.dateTimeService.overallDateRange.startMoment, this.dateTimeService.overallDateRange.endMoment, false);
      this.LoadMap();
    }
  }

  datetimeFromChange($event): void {
    this.dateTimeService.overallDateRange.setStartMoment($event.value);
  }

  datetimeToChange($event): void {
    this.dateTimeService.overallDateRange.setEndMoment($event.value);
  }

  sliderChange(): void {
    this.spinner.show();
    let range = this.dateTimeService.getRange(this.value);
    alert(range)
    if (range !== null) {
      console.log("original", this.originalFeatureCollection)
      if (this.originalFeatureCollection){
        try {
          this.lineService.clear();
        } catch {}
  
        let filtered = this.filterService.getFilteredCollection(
          range,
          this.originalFeatureCollection
        );
        
        this.lineService.drawLines(filtered);
        this.clusteringService.rebuildCluster(filtered);
      } else {
        try {
          this.lineService.clear();
          this.clusteringService.removeCluster();
        } catch {}
      }
    }
     
    this.spinner.hide();
  }
}
