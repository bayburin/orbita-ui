import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EmployeeApi } from '@modules/employee/api/employee.api';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { SvtApi } from '@modules/sd-request/api/svt/svt.api';
import { IBaseEmployeeGroupBuilder } from '@modules/employee/builders/base-employee-group.builder';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';
import { SearchTypes } from '@modules/employee/enums/search-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NewSdRequestFormService {
  constructor(
    private employeeApi: EmployeeApi,
    private svtApi: SvtApi
  ) { }

  /**
   * Сохраняет форму.
   */
  save(): void { }

  /**
   * Ищет работников по параметру, зависящему от полученных данных.
   *
   * @param term - данные для поиска.
   */
  searchEmployees(term: string): Observable<IBaseEmployeeGroup[]> {
    let key: SearchTypes;

    if (term.search(/\d*\-\d*/) !== -1) {
      key = SearchTypes.PHONE; // Если номер телефона
    } else if (!isNaN(parseFloat(term))) {
      key = SearchTypes.TN; // Если число
    } else {
      key = SearchTypes.FIO; // Если строка
    }

    return this.employeeApi.getEmployees(key, term).pipe(
      map((employees: IBaseEmployee[]) => {
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
      })
    );
  }

  /**
   * Ищет технику по инвентарному номеру.
   *
   * @param inventNum - инвентарный номер.
   */
  searchSvtItems(inventNum: string): Observable<ISvtItem[]> {
    return this.svtApi.getAnyItems(inventNum);
  }

  /**
   * Загружает технику, прикрепленную за пользователем.
   *
   * @param idTn - параметр id_tn пользователя.
   */
  loadUserSvtItems(idTn: number): Observable<ISvtItem[]> {
    return this.svtApi.getUserItems(idTn);
  }
}
