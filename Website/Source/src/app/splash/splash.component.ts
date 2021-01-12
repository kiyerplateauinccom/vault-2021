import { Component, OnDestroy, OnInit } from '@angular/core';
import { BuildStatus, SessionService } from '../Services/BusinessServices/session.service';
import { timer, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StatusService } from '../Services/BusinessServices/status.service';
import { environment } from 'src/environments/environment';
import { DataService } from '../Services/HttpServices/data.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit, OnDestroy{



  text: string = "";
  showNeedsBuild: boolean = false;
  showGif: boolean = true;

  private subscription: Subscription = null;
  private checkingText: string = "Checking status, Please wait...";
  private installNeeded: string = `It appears you need to import data before starting, <br>Please click the button below to start imporiting from <br> ${environment.urls.s3BucketUrl}.`;
  private installationInprogress: string = `Data import is in progress from ${environment.urls.s3BucketUrl}. <br>Please wait for the import to complete...`;
  private errorMessage: string = "Unfortunately there has been an error processing your request.<br> Please contact customer service."
  private startSubscription: Subscription;

  constructor(private readonly statusService: StatusService,
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private readonly dataService: DataService){ }

  ngOnInit() {
    this.text= this.checkingText;

    this.wireStatusListener();
    this.checkStatus();
  }

  private wireStatusListener(): void{
    this.statusService.statusChanged.subscribe(x=>{
        this.actOnStatus(x);
    });
  }

  private checkStatus(): void{
    if (!this.subscription){
      const statusTimer = timer(0, 10 * 1000);
      this.subscription = statusTimer.subscribe((val)=>{
          this.statusService.checkStatus();
      });
    }
  }

  private actOnStatus(status: BuildStatus): void{
      switch(status){
        case BuildStatus.ReadyForUse: 
            this.router.navigateByUrl('/visualization');
            break;
        case BuildStatus.InProgress:
        case BuildStatus.Processing:
            this.showNeedsBuild = false;
            this.showGif = true;
            this.text = this.installationInprogress;
            this.checkStatus();
            break;
        case BuildStatus.NotInstalled:
        case null:
        case undefined:
          this.showNeedsBuild = true;
          this.showGif = false;
          this.text= this.installNeeded;
          this.checkStatus();
            break;
        case BuildStatus.Error:
          this.showNeedsBuild = false;
          this.showGif = false;
          this.text = this.errorMessage;
          this.stopTimer();
            break;
      }
  }

  private stopTimer(){
    if (this.subscription){
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  ngOnDestroy(): void {
    this.statusService.dispose();
    this.stopTimer();

    if (this.startSubscription){
      this.startSubscription.unsubscribe;
      this.startSubscription =null;
    }
  }
  startImport(){
    if (this.sessionService.isNeedsInstall){
      this.startSubscription = this.dataService.postStartBuild().subscribe(x=>{
          this.actOnStatus(x);
      });
    }
  }
}
