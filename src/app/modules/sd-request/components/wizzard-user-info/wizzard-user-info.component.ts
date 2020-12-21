import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, filter, debounceTime, mergeMap, catchError } from 'rxjs/operators';

import { DynamicErrorStateMatcher } from '@shared/material/dynamic-error-state-matcher';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';

@Component({
  selector: 'app-wizzard-user-info',
  templateUrl: './wizzard-user-info.component.html',
  styleUrls: ['./wizzard-user-info.component.scss']
})
export class WizzardUserInfoComponent implements OnInit {
  searchEmployee: FormControl = new FormControl();
  isManually: FormControl = new FormControl(false);
  employeeGroups$: Observable<IBaseEmployeeGroup[]>;
  selectedEmployee: IBaseEmployee;
  dynamicErrorMatcher = new DynamicErrorStateMatcher();
  @Input() sourceSnapshotForm: FormGroup;

  get tn(): number {
    return this.sourceSnapshotForm.get('tn').value;
  }

  constructor(private formService: NewSdRequestFormService) { }

  ngOnInit(): void {
    this.searchEmployeeGroups();
    this.processingIsEmployeeManually();
  }

  /**
   * Событие выбора работника у компонента autocomplete
   *
   * @param employee - выбранный работник
   */
  selectEmployee(employee: IBaseEmployee): void {
    this.selectedEmployee = employee;
    this.sourceSnapshotForm.patchValue({
      id_tn: employee.id,
      tn: employee.personnelNo,
      fio: employee.fullName,
      dept: employee.departmentForAccounting,
      email: employee.emailText,
      tel: employee.phoneText
    });
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
  clearSearchEmployee(): void {
    this.searchEmployee.setValue(null);
    this.selectEmployee({ } as IBaseEmployee);
  }

  private searchEmployeeGroups(): void {
    this.employeeGroups$ = this.searchEmployee.valueChanges.pipe(
      startWith(''),
      filter(term => this.isNumber(term) ? true : term && term.length >= 2),
      debounceTime(300),
      mergeMap(term => {
        return this.formService.searchEmployees(term)
          .pipe(catchError(error => {
            console.log(error);
            this.searchEmployee.setErrors({ serverError: true});

            return of([]);
          }));
      })
    );
  }

  /**
   * Проверяет, содержит ли полученная строка только числа.
   */
  private isNumber(str: string): boolean {
    return !isNaN(parseFloat(str));
  }

  /**
   * Подписывается на поле "isManually" и по результатам активирует/отключает поле "searchEmployee".
   */
  private processingIsEmployeeManually(): void {
    this.isManually.valueChanges.subscribe(isActive => {
      if (isActive) {
        this.searchEmployee.disable();
      } else {
        this.searchEmployee.enable();
      }
    });
  }
}

