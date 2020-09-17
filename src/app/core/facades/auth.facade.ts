import { Injectable } from '@angular/core';

import { AuthHelper } from 'auth-center';
import { User } from '@core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  constructor(private authHelper: AuthHelper) {}

  getCurrentUser(): User {
    const payload = this.authHelper.getJwtPayload();

    return payload ? new User(payload) : null;
  }

  logout(): void {
    this.authHelper.logout();
  }
}
