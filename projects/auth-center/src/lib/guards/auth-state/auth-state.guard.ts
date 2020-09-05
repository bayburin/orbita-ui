import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthState } from '../../store/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthStateGuard implements CanActivate {
  constructor(
    private authState: AuthState,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authState.getAuthState$().pipe(
      map(authState => {
        if (authState.isValid(state.root.queryParams.state)) {
          this.authState.removeAuthState();
          return true;
        }

        this.router.navigate(['oauth2', 'authorize_forbidden']);
        return false;
      })
    );
  }
}
