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

  loginWithRedirect(): void {
    this.authService.redirectToAuthorizationServer();
  }

  loadAuthData(): void {
    this.store.dispatch(AuthActions.loadAuthData());
  }
}
