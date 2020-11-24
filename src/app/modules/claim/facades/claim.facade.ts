import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducer';
import * as ClaimActions from '@modules/claim/store/actions/claim.actions';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';
import { Claim } from '@modules/claim/models/claim/claim.model';
import { ClaimFactory } from '@modules/claim/factories/claim/claim.factory';
import { UserFacade } from '@modules/user/facades/user.facade';

@Injectable({
  providedIn: 'root'
})
export class ClaimFacade {
  claims$: Observable<Claim[]>;
  claim$: Observable<Claim>;

  constructor(
    private store: Store<fromClaims.State>,
    private userFacade: UserFacade
  ) {
    this.claims$ = combineLatest([store.select(ClaimSelectors.getAll), userFacade.users$])
                     .pipe(map((data) => data[0].map(claim => ClaimFactory.create(claim.type, claim, { users: data[1] }))));
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
