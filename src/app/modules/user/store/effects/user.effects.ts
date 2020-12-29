import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import { UserApi } from '@modules/user/api/user.api';
import { State } from '@modules/user/store/reducers/user.reducer';
import * as UserActions from '@modules/user/store/actions/user.actions';
import * as UserSelectors from '@modules/user/store/selectors/user.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userApi: UserApi,
    private store: Store<State>
  ) { }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAll),
      withLatestFrom(this.store.select(UserSelectors.getIds)),
      filter(([action, users]) => users.length === 0),
      mergeMap(() => this.userApi.getUsers()
        .pipe(
          map(users => UserActions.loadAllSuccess({ users })),
          catchError(error => of(UserActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
