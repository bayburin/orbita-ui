import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { ClaimService } from '@modules/claim/services/claim/claim.service';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { Claim } from '@modules/claim/models/claim/claim.model';
// import { ClaimState } from '@modules/claim/store/state/claim.state';
import { getAllClaims } from '@modules/claim/store/selectors/claim.selectors';

@Injectable()
export class ClaimFacade {
  // allClaims$ = this.store.select(getAllClaims)

  constructor(
    // private store: Store<ClaimState>,
    // private claimService: ClaimService
  ) {}

  /**
   * Загрузить список заявок.
   */
  // loadClaims(): Observable<Claim[]> {
  //   return this.claimService.getClaims()
  //     .pipe(map((iClaims: IClaim[]) => iClaims.map(iClaim => new Claim(iClaim))));
  // }
}
