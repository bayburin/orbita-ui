import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducer';
import * as ClaimActions from '@modules/claim/store/actions/claim.actions';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';
import { Claim } from '@modules/claim/models/claim/claim.model';
import { ClaimFactory } from '@modules/claim/factories/claim/claim.factory';

@Injectable({
  providedIn: 'root'
})
export class ClaimFacade {
  claims$: Observable<Claim[]>;
  claim$: Observable<Claim>;

  constructor(private store: Store<fromClaims.State>) {
    this.claims$ = store.select(ClaimSelectors.getAll).pipe(map(claims => claims.map(claim => ClaimFactory.create(claim.type, claim))));
    this.claim$ = store.select(ClaimSelectors.getEntity).pipe(map(claim => ClaimFactory.create(claim.type, claim)));
  }

  /**
   * Загрузить список заявок.
   */
  loadClaims(): void {
    this.store.dispatch(ClaimActions.loadAll());
  }

  /**
   * Показать рабочий процесс выбранной заявки.
   *
   * @param id - id выбранной заявки.
   */
  showWorkflow(id: number): void {
    this.store.dispatch(ClaimActions.select({ id }));
  }
}
