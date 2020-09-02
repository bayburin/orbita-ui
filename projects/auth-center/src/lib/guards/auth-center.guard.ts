import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from './../store/auth.reducers';
import * as AuthSelectors from './../store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthCenterGuard implements CanActivate {
  constructor(private store: Store<State>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(AuthSelectors.getIsAuthenticateed);
  }
}
