import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import { State } from './auth.reducers';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthDataEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }

  loadAuthData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadAuthData),
      mergeMap(() => this.authService.getAuthData()
        .pipe(
          map(authData => AuthActions.loadAuthDataSuccess({ authData })),
          catchError(error => of(AuthActions.loadAuthDataFailure({ error })))
        )
      )
    )
  );
}
