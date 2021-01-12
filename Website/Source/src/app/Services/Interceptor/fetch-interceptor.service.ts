import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerManagementService } from '../BusinessServices/spinner-management.service';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchInterceptorService implements HttpInterceptor {

  constructor(private readonly spinner: SpinnerManagementService) { }

  intercept(request: import("@angular/common/http").HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.canInteractWithSpinner(request.url)){
      this.spinner.show();
    }
    let modifiedReq;
    if (this.needsApiKey(request.url)){
      modifiedReq = request.clone({ 
        headers: request.headers.set('x-api-key', environment.tokens.apiToken),
      });
    }
    else{
      modifiedReq = request;
    }

    return next.handle(modifiedReq).pipe(
      finalize(() => {
        if (this.canInteractWithSpinner(request.url)){
          this.spinner.hide();
        }
      })
    );
  }
	private canInteractWithSpinner(url: string) {
    return url.indexOf(environment.urls.mapDataUrlPart) >= 0;
  };
  
  private needsApiKey(url:string){
    return url.indexOf("json_output") < 0;
  }

}
