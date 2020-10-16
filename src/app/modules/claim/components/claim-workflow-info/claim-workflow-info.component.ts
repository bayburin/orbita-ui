import { Component, Input, OnInit } from '@angular/core';

import { Claim } from '@modules/claim/models/claim/claim.model';
import { historyActionTypesMap } from '@modules/claim/enums/history-action-type.enum';

@Component({
  selector: 'app-claim-workflow-info',
  templateUrl: './claim-workflow-info.component.html',
  styleUrls: ['./claim-workflow-info.component.scss']
})
export class ClaimWorkflowInfoComponent implements OnInit {
  historyActionTypes = historyActionTypesMap;
  @Input() claim: Claim;

  constructor() { }

  ngOnInit(): void {}
}
