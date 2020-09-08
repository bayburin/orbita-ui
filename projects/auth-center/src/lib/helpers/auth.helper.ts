import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { CurrentUser } from '../models/current_user.model';
import { AuthState } from './../store/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthHelper {
  constructor(
    private state: AuthState,
    private jwtHelper: JwtHelperService
  ) { }

  getCurrentUser(): CurrentUser {
    const decoded = this.jwtHelper.decodeToken(this.state.getJwt());
    console.log(decoded);

    if (decoded) {
      return new CurrentUser(decoded.id_tn, decoded.tn, decoded.fio, decoded.dept);
    }

    return null;
  }
}
