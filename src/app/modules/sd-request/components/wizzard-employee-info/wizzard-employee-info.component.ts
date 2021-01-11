import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, filter, debounceTime, map } from 'rxjs/operators';

import { DynamicErrorStateMatcher } from '@shared/material/dynamic-error-state-matcher';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';
import { EmployeeFacade } from '@modules/employee/facades/employee.facade';

@Component({
  selector: 'app-wizzard-employee-info',
  templateUrl: './wizzard-employee-info.component.html',
  styleUrls: ['./wizzard-employee-info.component.scss']
})
export class WizzardEmployeeInfoComponent implements OnInit, OnDestroy {
  searchEmployee: FormControl = new FormControl(null, [Validators.required]);
  isManually: FormControl = new FormControl(false);
  employeeGroups$: Observable<IBaseEmployeeGroup[]>;
  selectedEmployee: IBaseEmployee;
  dynamicErrorMatcher = new DynamicErrorStateMatcher();
  searchEmployeeSub: Subscription;
  @Input() sourceSnapshotForm: FormGroup;

  get tn(): number {
    return this.sourceSnapshotForm.get('tn').value;
  }

  constructor(private employeeFacade: EmployeeFacade) { }

  ngOnInit(): void {
    this.searchEmployees();
    this.processingIsEmployeeManually();
  }

  ngOnDestroy(): void {
    this.searchEmployeeSub.unsubscribe();
  }

  /**
   * Записывает данные выбранной ВТ в атрибуты формы и запоминает выбранную технику.
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

  private searchEmployees(): void {
    this.searchEmployeeSub = this.searchEmployee.valueChanges.pipe(
      startWith(''),
      filter(term => this.isNumber(term) ? true : term && term.length >= 2),
      debounceTime(300),
    ).subscribe(term => this.employeeFacade.searchEmployees(term));

    this.employeeGroups$ = this.employeeFacade.employees$.pipe(
      map(employees => this.employeeFacade.createGroups(employees))
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
