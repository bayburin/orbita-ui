import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAuth from '../store/auth.reducers';
import * as AuthSelectors from '../store/auth.selectors';
import * as AuthActions from '../store/auth.actions';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private store: Store<fromAuth.State>,
    private authService: AuthService
  ) {
    this.isAuthenticated$ = store.select(AuthSelectors.getIsAuthenticateed);
  }

  configure(): void {
    this.authService.redirectToAuthorizePage();
  }

  loginWithRedirect(): void {
    const authCenterUri = 'https://auth-center.iss-reshetnev.ru/oauth/authorize';
    const queryParams = `?client_id=83&response_type=code&state=''&redirect_uri=https://localhost.iss-reshetnev.ru:4200/oauth2/callback&scope=`;
    const authorizeUri = authCenterUri + queryParams;

    window.open(authorizeUri, '_self');
  }

  loadAuthData(): void {
    this.store.dispatch(AuthActions.loadAuthData());
  }
}
