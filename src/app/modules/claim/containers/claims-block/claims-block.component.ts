import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducer';
import * as claimActions from '@modules/claim/store/actions/claim.actions';

@Component({
  selector: 'app-claims-block',
  templateUrl: './claims-block.component.html',
  styleUrls: ['./claims-block.component.scss']
})
export class ClaimsBlockComponent {
  constructor(private store: Store<fromClaims.State>) {
    this.store.dispatch(claimActions.loadAll());
  }
}
