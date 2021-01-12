import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilityService {
  constructor() {}

  public deepCopy<T>(whatToCopy: T): T {
    return JSON.parse(JSON.stringify(whatToCopy));
  }
}
