import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import { ClaimApi } from '@modules/claim/api/claim.api';
import { State } from '@modules/claim/store/reducers/claim.reducer';
import * as ClaimActions from '@modules/claim/store/actions/claim.actions';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';

@Injectable()
export class ClaimEffects {
  constructor(
    private actions$: Actions,
    private claimApi: ClaimApi,
    private store: Store<State>
  ) { }

  loadClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClaimActions.loadAll),
      withLatestFrom(this.store.select(ClaimSelectors.getIds)),
      filter(([action, claims]) => claims.length === 0),
      mergeMap(() => this.claimApi.getClaims()
        .pipe(
          map(claims => ClaimActions.loadAllSuccess({ claims })),
          catchError(error => of(ClaimActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
