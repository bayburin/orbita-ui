import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { claimPrioritiesMap } from '@modules/claim/enums/claim-priorities.enum';

@Component({
  selector: 'app-wizzard-additional',
  templateUrl: './wizzard-additional.component.html',
  styleUrls: ['./wizzard-additional.component.scss']
})
export class WizzardAdditionalComponent {
  priorities = claimPrioritiesMap;
  @Input() sdRequestForm: FormGroup;

  constructor() { }
}
