import { Injectable } from "@angular/core";
import { DateRange } from "./datetime.service";
import { FeaturesCollection, AppFeature } from "../../objects/featureSet";
import { UtilityService } from "./utility.service";

@Injectable({
  providedIn: "root"
})
export class FilterService {
  constructor(private readonly utilityService: UtilityService) {}

  getFilteredCollection(
    range: DateRange,
    featureCollection: FeaturesCollection
  ): FeaturesCollection {
    if (featureCollection) {
      let clone = this.utilityService.deepCopy<FeaturesCollection>(
        featureCollection
      );
      clone.features = clone.features.filter(
        x =>
          new Date(x.properties.time).getTime() >= range.startDate.getTime() &&
          new Date(x.properties.time).getTime() <= range.endDate.getTime()
      );
      return clone;
    }
    return featureCollection;
  }

  sorteOnDate(collection: FeaturesCollection): AppFeature[] {
    return collection.features.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return (
        new Date(b.properties.time).getTime() -
        new Date(b.properties.time).getTime()
      );
    });
  }
}
