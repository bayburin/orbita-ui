import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { mergeMap, map, startWith, debounceTime, filter, catchError } from 'rxjs/operators';

import { DynamicErrorStateMatcher } from '@shared/material/dynamic-error-state-matcher';
import { EmployeeFacade } from '@modules/employee/facades/employee.facade';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { gendersMap } from '@modules/employee/enums/gender.enum';
import { Genders } from '@modules/employee/enums/gender.enum';

export interface EmployeeGroup {
  dept: number;
  employees: IBaseEmployee[];
}

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
  selectedEmployee: IBaseEmployee;
  @Input() sourceSnapshotForm: FormGroup;

  get sourceSnapshotFormControl() {
    return this.sourceSnapshotForm.controls;
  }

  get tn(): number {
    return this.sourceSnapshotFormControl.tn.value;
  }

  get fio(): string {
    return this.sourceSnapshotFormControl.fio.value;
  }

  get dept(): number {
    return this.sourceSnapshotFormControl.dept.value;
  }

  get email(): string {
    return this.sourceSnapshotFormControl.email.value;
  }

  get tel(): string {
    return this.sourceSnapshotFormControl.tel.value;
  }

  get mobile(): string {
    return this.sourceSnapshotFormControl.mobile.value;
  }

  get profession(): string {
    return this.selectedEmployee.professionForAccounting;
  }

  get gender(): Genders {
    return this.selectedEmployee.sex;
  }

  constructor(private employeeFacade: EmployeeFacade) { }

  ngOnInit(): void {
    this.searchEmployee = new FormControl();
    this.isManually = new FormControl(false);
    this.isManually.valueChanges.subscribe(isActive => {
      if (isActive) {
        this.searchEmployee.disable();
      } else {
        this.searchEmployee.enable();
      }
    });
    this.createSearchEmployeeSubscription();
  }

  /**
   * Событие выбора пользователя у компонента autocomplete
   *
   * @param employee - выбранный работник
   */
  employeeSelected(employee: IBaseEmployee): void {
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
   * Выводит для пользователя в строке option компонента autocomplete.
   *
   * @param employee - работник из списка найденных
   */
  displayEmployeeFn(employee: IBaseEmployee): string {
    return employee && employee.fullName ? employee.fullName : '';
  }

  /**
   * Очищает поле поиска пользователя и поля формы, которая отправится на сервер.
   */
  clearEmployee(): void {
    this.searchEmployee.setValue([]);
    this.employeeSelected({ } as IBaseEmployee);
  }

  /**
   * Подписывается на поле поиска пользователя и возвращает массив, сгруппированный по отделам.
   */
  private createSearchEmployeeSubscription(): void {
    this.employeeGroups$ = this.searchEmployee.valueChanges.pipe(
      startWith(''),
      filter(term => this.isNumber(term) ? true : term && term.length >= 2),
      debounceTime(300),
      mergeMap(term => {
        return this.employeeFacade.loadEmployees(term)
          .pipe(catchError(error => {
            // TODO: Добавить вывод ошибки через всплывающее окно.
            this.searchEmployee.setErrors({ serverError: true});

            return of([]);
          }));
      }),
      map((employees: IBaseEmployee[]) => {
        return employees.reduce((acc, employee) => {
          const accEl = acc.find((el: EmployeeGroup) => el.dept === employee.departmentForAccounting);

          if (accEl) {
            accEl.employees.push(employee);
          } else {
            const res: EmployeeGroup = {
              dept: employee.departmentForAccounting,
              employees: [employee]
            };

            acc.push(res);
          }

          return acc.sort((a, b) => {
            if (a.dept > b.dept) {
              return 1;
            }
            if (a.dept < b.dept) {
              return -1;
            }
          });
        }, []);
      })
    );
  }

  /**
   * Проверяет, содержит ли полученная строка только числа.
   */
  private isNumber(str: string): boolean {
    return !isNaN(parseFloat(str));
  }
}

