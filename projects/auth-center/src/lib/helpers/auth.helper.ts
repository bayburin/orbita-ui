import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CurrentUser } from '../models/current_user.model';
import { AuthState } from './../store/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthHelper {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private state: AuthState,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.state.getIsAuthenticated$();
  }

  getCurrentUser(): CurrentUser {
    const decoded = this.jwtHelper.decodeToken(this.state.getJwt());
    console.log(decoded);

    if (decoded) {
      return new CurrentUser(decoded.id_tn, decoded.tn, decoded.fio, decoded.dept);
    }

    return null;
  }

  logout(): void {
    this.router.navigate(['oauth2', 'unauthorized']);
  }
}
