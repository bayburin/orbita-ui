import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducer';
import * as ClaimActions from '@modules/claim/store/actions/claim.actions';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';
import { Claim } from '../models/claim/claim.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimFacade {
  claims$: Observable<Claim[]>;

  constructor(private store: Store<fromClaims.State>) {
    this.claims$ = store.select(ClaimSelectors.getAll);
  }

  /**
   * Загрузить список заявок.
   */
  loadClaims(): void {
    this.store.dispatch(ClaimActions.loadAll());
  }
}
