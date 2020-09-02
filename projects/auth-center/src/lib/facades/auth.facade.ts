import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAuth from '../store/auth.reducers';
import * as AuthSelectors from '../store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) {
    this.isAuthenticated$ = store.select(AuthSelectors.getIsAuthenticateed);
  }
}
