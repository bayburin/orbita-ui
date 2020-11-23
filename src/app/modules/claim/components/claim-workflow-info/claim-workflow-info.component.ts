import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Claim } from '@modules/claim/models/claim/claim.model';
import { eventTypeNamesMap } from '@modules/claim/enums/event-type-names.enum';

@Component({
  selector: 'app-claim-workflow-info',
  templateUrl: './claim-workflow-info.component.html',
  styleUrls: ['./claim-workflow-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClaimWorkflowInfoComponent {
  eventTypeNames = eventTypeNamesMap;
  @Input() claim: Claim;

  constructor() { }
}
