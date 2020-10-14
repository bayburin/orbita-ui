import { Component, Input, OnInit } from '@angular/core';

import { Claim } from '@modules/claim/models/claim/claim.model';

@Component({
  selector: 'app-claim-workflow-info',
  templateUrl: './claim-workflow-info.component.html',
  styleUrls: ['./claim-workflow-info.component.scss']
})
export class ClaimWorkflowInfoComponent implements OnInit {
  @Input() claim: Claim;

  constructor() { }

  ngOnInit(): void {}
}
