import { gendersMap } from '@modules/employee/enums/gender.enum';
import { Component, Input } from '@angular/core';

import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

@Component({
  selector: 'app-employee-mini-card',
  templateUrl: './employee-mini-card.component.html',
  styleUrls: ['./employee-mini-card.component.scss']
})
export class EmployeeMiniCardComponent {
  genders = gendersMap;
  @Input() employee: IBaseEmployee;

  constructor() { }
}
