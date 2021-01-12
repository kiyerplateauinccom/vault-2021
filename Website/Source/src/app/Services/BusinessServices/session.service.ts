import { Injectable, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../HttpServices/data.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  buildState: BuildStatus = null;

  constructor() { }

  get isReadyForUse(): boolean{
    return this.buildState === BuildStatus.ReadyForUse;
  }

  get isNeedsInstall(): boolean{
    return this.buildState === null ||
    this.buildState === undefined || 
    this.buildState === BuildStatus.NotInstalled;
  }
}

export enum BuildStatus{
  NotInstalled = 0,
  InProgress =1,
  Processing = 2,
  ReadyForUse = 3,
  Error = 5
}
