import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

import { AuthService } from './../services/auth.service';
import { AuthState } from './../store/auth.state';
import { RequestState } from '../request_state';
import { tap, catchError } from 'rxjs/operators';

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
    const state = new RequestState();

    this.authState.setAuthState(state);
    this.authService.redirectToAuthorizationServer(state);
  }

  initAuthenticateProcess(params: Params): void {
    this.authService.authorize(params).pipe(
      tap(data => {
        // TODO: Сохранить пользователя и токен в хранилищ
        this.authState.setIsAuthenticated(true);
      }),
      // catchError(() => {
      //   // TODO: Сохранить в хранилище ошибку.
      // })
    );
  }
}
