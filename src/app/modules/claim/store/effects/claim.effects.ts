import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { ClaimService } from '@modules/claim/services/claim/claim.service';
import * as claimActions from '@modules/claim/store/actions/claim.actions';
import { Claim } from '@modules/claim/models/claim/claim.model';

@Injectable()
export class ClaimEffects {
  constructor(
    private actions$: Actions,
    private claimService: ClaimService
  ) { }

  loadClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(claimActions.loadAll),
      mergeMap(() => this.claimService.getClaims()
        .pipe(
          map(iClaims => iClaims.map(iClaim => new Claim(iClaim))),
          map(claims => claimActions.loadAllSuccess({ claims })),
          catchError(error => of(claimActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
