import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, Params, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../BusinessServices/session.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuardService  implements CanActivate{

  constructor(private readonly sessionService: SessionService)  { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.sessionService.isReadyForUse;
  }
}
