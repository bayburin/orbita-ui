import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './../services/auth.service';
import { AuthState } from './../store/auth.state';
import { RequestState } from '../request_state';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private authState: AuthState
  ) { }

  loginWithRedirect(): void {
    const state = RequestState.generateCode();

    this.authState.setAuthState(state);
    this.authService.redirectToAuthorizationServer(state);
  }

  loadAuthData(): void {

  }
}
