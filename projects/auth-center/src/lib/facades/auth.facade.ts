import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Params, Router } from '@angular/router';

import { AuthService } from './../services/auth.service';
import { AuthState } from './../store/auth.state';
import { RequestState } from '../request_state';
import { finalize } from 'rxjs/operators';
import { IConfig } from './../interfaces/config.interface';
import { CONFIG } from '../auth-center.config';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private authService: AuthService,
    private authState: AuthState,
    private router: Router,
    @Inject(CONFIG) private config: IConfig
  ) {
    this.isLoading$ = this.authState.getIsLoading$();
    this.error$ = this.authState.getError$();
  }

  loginWithRedirect(): void {
    const state = new RequestState();

    this.authState.setRequestState(state);
    this.authService.redirectToAuthorizationServer(state);
  }

  initAuthenticateProcess(params: Params): void {
    this.authState.setIsLoading(true);
    this.authState.removeRequestState();
    this.authService.getJwt(params).pipe(
      finalize(() => this.authState.setIsLoading(false))
    ).subscribe(
      data => {
        this.authState.setJwt(data.token);

        setTimeout(() => {
          this.authState.setIsAuthenticated(true);
          this.router.navigateByUrl(this.authState.getReturnUrl());
          this.authState.setReturnUrl('/');
        }, 1000);
      },
      error => {
        console.log(error);
        this.authState.setError(error);
      }
    );
  }

  logout(): void {
    this.authState.setIsAuthenticated(false);
    this.authState.removeJwt();
  }

  getAppName(): string {
    return this.config.appName;
  }
}
