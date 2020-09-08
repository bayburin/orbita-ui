import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params, Router } from '@angular/router';

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
    private authState: AuthState,
    private router: Router
  ) { }

  loginWithRedirect(): void {
    const state = new RequestState();

    this.authState.setRequestState(state);
    this.authService.redirectToAuthorizationServer(state);
  }

  initAuthenticateProcess(params: Params): void {
    this.authState.removeRequestState();
    this.authService.getJwt(params).pipe(
      tap(data => {
        this.authState.setJwt(data.token);
        this.authState.setIsAuthenticated(true);
        this.router.navigateByUrl(this.authState.getReturnUrl());
        this.authState.setReturnUrl('/');
      }),
      // catchError(() => {
      //   // TODO: Сохранить в хранилище ошибку.
      // })
    ).subscribe();
  }

  logout(): void {
    this.authState.removeJwt();
  }
}
