import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ClaimFacade } from '@modules/claim/facades/claim.facade';
import { Claim } from '@modules/claim/models/claim/claim.model';
@Component({
  selector: 'app-claims-block',
  templateUrl: './claims-block.component.html',
  styleUrls: ['./claims-block.component.scss']
})
export class ClaimsBlockComponent implements OnInit {
  claims$: Observable<Claim[]>;
  claim$: Observable<Claim>;
  dataSource: MatTableDataSource<Claim>;

  constructor(private claimFacade: ClaimFacade) {
    this.claims$ = claimFacade.claims$;
    this.claim$ = claimFacade.claim$;
  }

  ngOnInit(): void {
    this.claimFacade.loadClaims();
    this.claims$.subscribe(claims => this.dataSource = new MatTableDataSource(claims));
  }

  onSelect(claimId: number): void {
    this.claimFacade.showWorkflow(claimId);
  }
}
