import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import {
  OwlMomentDateTimeModule,
  OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS
} from "ng-pick-datetime-moment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { Ng5SliderModule } from "ng5-slider";
import { FetchInterceptorService } from "./Services/Interceptor/fetch-interceptor.service";
import { ClusteringService } from "./Services/BusinessServices/clustering.service";
import { FilterService } from "./Services/BusinessServices/filter.service";
import { MapService } from "./Services/BusinessServices/map.service";
import { UtilityService } from "./Services/BusinessServices/utility.service";
import { DataService } from "./Services/HttpServices/data.service";
import { PopoverformatterService } from "./Services/BusinessServices/popoverformatter.service";
import { DatetimeService } from "./Services/BusinessServices/datetime.service";
import { LineService } from "./Services/BusinessServices/line.service";
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinnerManagementService } from "./Services/BusinessServices/spinner-management.service";
import { SplashComponent } from './splash/splash.component';
import { SecurityGuardService } from "./Services/Guards/security-guard.service";
import { SessionService } from "./Services/BusinessServices/session.service";
import { StatusService } from "./Services/BusinessServices/status.service";

@NgModule({
  declarations: [AppComponent, NavMenuComponent, HomeComponent, SplashComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      { path: "", component: SplashComponent },
      { path: "splash", component: SplashComponent},
      { path: "visualization", component: HomeComponent, canActivate:[SecurityGuardService] },
      { path: "**", component: SplashComponent }
    ])
  ],
  providers: [
    ClusteringService,
    FilterService,
    MapService,
    UtilityService,
    DataService,
    PopoverformatterService,
    LineService,
    DatetimeService,
    SecurityGuardService,
    SessionService,
    StatusService,
    SpinnerManagementService,
    {
      provide: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS,
      useValue: { useUtc: true }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FetchInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
