import { Injectable } from "@angular/core";
import { IMapPopoverFormatter } from "../Interfaces/iMapPopoverFormatter";
import { Property, AppFeature, Satellite } from "../../objects/featureSet";
import { DatetimeService } from "./datetime.service";

@Injectable({
  providedIn: "root"
})
export class PopoverformatterService implements IMapPopoverFormatter {
  constructor(private readonly dateService: DatetimeService) {}
  getHtml(eventArgs: any): string {
    const feature = eventArgs.features[0] as any;
    var property = feature.properties as any;
    var sats = JSON.parse(property.satellites);
    var html =
      "<br><table  class='table table-sm table-borderless table-condensed'>";
    let alignRight = "style='text-align: right'";
    html += this.getRow("Vessel Name", property.vesselName, alignRight);
    html += this.getRow("Call Sign", property.callSign, alignRight);
    html += this.getRow("Transponder Number", property.mmsiNumber, alignRight)
    html += this.getRow(
      "Date /Time",
      this.dateService.getDateAsUtcString(new Date(property.time)),
      alignRight
    );
    html += this.getRow(
      "Logitude",
      feature.geometry.coordinates[0].toFixed(6),
      alignRight
    );
    html += this.getRow(
      "Latitude",
      feature.geometry.coordinates[1].toFixed(6),
      alignRight
    );
    html += this.getRow(
      "Number of Satellites",
      sats.length.toString(),
      alignRight
    );
    if (sats.length > 0) {
      html += "</table>";
      html += "<table class='table table-striped table-sm table-condensed'> ";
      html += this.getRow("Satellite Name", "Norad Identifier");

      try {
        for (let index = 0; index < sats.length; index++) {
          let sat = sats[index];
        
          var norad =
            sat.noradCatNumber && sat.noradCatNumber.trim() != ""
              ? sat.noradCatNumber
              : "- -";
          html += this.getOnceCellRow(norad, alignRight);
        }
      } catch (ex) {
        console.log("error", ex);
      }

      html += "</table>";
    }

    return html;
  }

  private getRow(label: string, value: string, valueStyle: string = "") {
    return `<tr><td>${label}</td><td ${valueStyle}>${value}</td></tr>`;
  }

  private getOnceCellRow(value: string, valueStyle: string = "") {
    return `<tr><td ${valueStyle}>${value}</td></tr>`;
  }
}
