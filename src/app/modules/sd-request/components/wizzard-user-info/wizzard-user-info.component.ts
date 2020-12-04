import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { DynamicErrorStateMatcher } from '@shared/material/dynamic-error-state-matcher';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { gendersMap } from '@modules/employee/enums/gender.enum';
import { Genders } from '@modules/employee/enums/gender.enum';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { EmployeeGroup } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';

@Component({
  selector: 'app-wizzard-user-info',
  templateUrl: './wizzard-user-info.component.html',
  styleUrls: ['./wizzard-user-info.component.scss']
})
export class WizzardUserInfoComponent implements OnInit {
  searchEmployee: FormControl;
  employeeGroups$: Observable<EmployeeGroup[]>;
  isManually: FormControl;
  dynamicMatcher = new DynamicErrorStateMatcher();
  genders = gendersMap;
  @Input() sourceSnapshotForm: FormGroup;

  get tn(): number {
    return this.sourceSnapshotForm.get('tn').value;
  }

  get fio(): string {
    return this.sourceSnapshotForm.get('fio').value;
  }

  get dept(): number {
    return this.sourceSnapshotForm.get('dept').value;
  }

  get email(): string {
    return this.sourceSnapshotForm.get('email').value;
  }

  get tel(): string {
    return this.sourceSnapshotForm.get('tel').value;
  }

  get mobile(): string {
    return this.sourceSnapshotForm.get('mobile').value;
  }

  get profession(): string {
    return this.formService.selectedEmployee.professionForAccounting;
  }

  get gender(): Genders {
    return this.formService.selectedEmployee.sex;
  }

  constructor(private formService: NewSdRequestFormService) { }

  ngOnInit(): void {
    this.searchEmployee = this.formService.searchEmployee;
    this.isManually = this.formService.isUserInfoManually;
    this.employeeGroups$ = this.formService.employeeGroups$;
  }

  /**
   * Событие выбора работника у компонента autocomplete
   *
   * @param employee - выбранный работник
   */
  selectEmployee(employee: IBaseEmployee): void {
    this.formService.sourceSnapshot = employee;
  }

  /**
   * Выводит ФИО работника в строке option компонента autocomplete.
   *
   * @param employee - работник из списка найденных
   */
  displayEmployeeFn(employee: IBaseEmployee): string {
    return employee && employee.fullName ? employee.fullName : '';
  }

  /**
   * Очищает компонент autocomplete, указывающее выбранного работника.
   */
  clearEmployee(): void {
    this.formService.clearEmployee();
  }
}

