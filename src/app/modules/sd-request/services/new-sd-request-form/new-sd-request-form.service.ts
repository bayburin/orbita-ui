import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EmployeeApi } from '@modules/employee/api/employee.api';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { SvtApi } from '@modules/sd-request/api/svt/svt.api';
import { IBaseEmployeeGroupBuilder } from '@modules/employee/builders/base-employee-group.builder';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';

@Injectable({
  providedIn: 'root'
})
export class NewSdRequestFormService {
  constructor(
    private employeeApi: EmployeeApi,
    private sdApi: ServiceDeskApi,
    private svtApi: SvtApi,
  ) {
    this.loadServices();
  }

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
    let key: 'phoneText' | 'personnelNo' | 'fullName';

    if (term.search(/\d*\-\d*/) !== -1) {
      key = 'phoneText'; // Если номер телефона
    } else if (!isNaN(parseFloat(term))) {
      key = 'personnelNo'; // Если число
    } else {
      key = 'fullName'; // Если строка
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

  // TODO: Перенести данные в стор.
  loadServices(): Observable<IService[]> {
    return this.sdApi.getServices();
  }
}
