import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import { ClaimService } from '@modules/claim/services/claim/claim.service';
import * as fromClaims from '@modules/claim/store/reducers/claim.reducer';
import * as ClaimActions from '@modules/claim/store/actions/claim.actions';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';
import { Claim } from '@modules/claim/models/claim/claim.model';

@Injectable()
export class ClaimEffects {
  constructor(
    private actions$: Actions,
    private claimService: ClaimService,
    private store: Store<fromClaims.State>
  ) { }

  loadClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClaimActions.loadAll),
      // FIXME: Эти строки ломают тесты.
      // withLatestFrom(this.store.select(ClaimSelectors.getClaims)),
      // filter(([action, claims]) => claims === null),
      mergeMap(() => this.claimService.getClaims()
        .pipe(
          map(iClaims => iClaims.map(iClaim => new Claim(iClaim))),
          map(claims => ClaimActions.loadAllSuccess({ claims })),
          catchError(error => of(ClaimActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
