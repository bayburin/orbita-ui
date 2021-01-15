import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromEmployees from '@modules/employee/store/employee.reducer';
import * as EmployeeActions from '@modules/employee/store/employee.actions';
import * as EmployeeSelectors from '@modules/employee/store/employee.selectors';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';
import { IBaseEmployeeGroupBuilder } from '@modules/employee/builders/base-employee-group.builder';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFacade {
  employees$: Observable<IBaseEmployee[]>;

  constructor(private store: Store<fromEmployees.State>) {
    this.employees$ = store.select(EmployeeSelectors.getAll);
  }

  /**
   * Загружает список работников.
   *
   * @param term - поисковая строка
   */
  searchEmployees(term: string): void {
    this.store.dispatch(EmployeeActions.searchByTerm({ term }));
  }

  /**
   * Возвращает массив работников, сгруппированный по отделам.
   *
   * @param users - массив работников.
   */
  createGroups(employees: IBaseEmployee[]): IBaseEmployeeGroup[] {
    return employees.reduce((acc, employee) => {
      const accEl = acc.find((el: IBaseEmployeeGroup) => el.dept === employee.departmentForAccounting);

      if (accEl) {
        accEl.employees.push(employee);
      } else {
        const res = new IBaseEmployeeGroupBuilder()
                      .dept(employee.departmentForAccounting)
                      .employees([employee])
                      .build();

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
  }
}
