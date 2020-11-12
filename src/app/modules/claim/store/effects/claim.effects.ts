import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import { ClaimService } from '@modules/claim/services/claim/claim.service';
import { State } from '@modules/claim/store/reducers/claim.reducer';
import * as ClaimActions from '@modules/claim/store/actions/claim.actions';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';

@Injectable()
export class ClaimEffects {
  constructor(
    private actions$: Actions,
    private claimService: ClaimService,
    private store: Store<State>
  ) { }

  loadClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClaimActions.loadAll),
      withLatestFrom(this.store.select(ClaimSelectors.getIds)),
      filter(([action, claims]) => claims.length === 0),
      mergeMap(() => this.claimService.getClaims()
        .pipe(
          map(claims => ClaimActions.loadAllSuccess({ claims })),
          catchError(error => of(ClaimActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
