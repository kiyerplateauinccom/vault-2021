import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../HttpServices/data.service';
import { BuildStatus, SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  statusChanged: EventEmitter<BuildStatus>  = new EventEmitter();
  private subscription: Subscription;
  
  constructor(private readonly dataService: DataService,
    private readonly sessionService: SessionService) { }

    checkStatus(): void{
      this.subscription = this.dataService.getBuildState().subscribe(x=>{
          this.sessionService.buildState = x ;
          this.statusChanged.emit(x);
      });
    }

    dispose(){
      if (this.subscription){
        this.subscription.unsubscribe();
        this.subscription = null;
      }
    }
}
