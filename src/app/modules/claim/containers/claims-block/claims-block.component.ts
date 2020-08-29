import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ClaimFacade } from '@modules/claim/facades/claim.facade';
import { Claim } from '@modules/claim/models/claim/claim.model';

@Component({
  selector: 'app-claims-block',
  templateUrl: './claims-block.component.html',
  styleUrls: ['./claims-block.component.scss']
})
export class ClaimsBlockComponent implements OnInit {
  claims$: Observable<Claim[]>;

  constructor(private claimFacade: ClaimFacade) {
    this.claims$ = claimFacade.claims$;
  }

  ngOnInit(): void {
    this.claimFacade.loadClaims();
  }
}
