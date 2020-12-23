import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatListOption } from '@angular/material/list';
import * as moment from 'moment';

import { EmployeeApi } from '@modules/employee/api/employee.api';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { SvtApi } from '@modules/sd-request/api/svt/svt.api';
import { UserFacade } from '@modules/user/facades/user.facade';
import { IUser } from '@modules/user/interfaces/user.interface';
import { IGroup } from '@modules/user/interfaces/group.interface';
import { AuthHelper } from '@iss/ng-auth-center';
import { ClaimPriorities } from '@modules/claim/enums/claim-priorities.enum';
import { IBaseEmployeeGroupBuilder } from '@modules/employee/builders/base-employee-group.builder';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';

export interface FileGroup {
  file: File;
  data: string | ArrayBuffer;
}

export interface UserGroup {
  group: IGroup;
  users: IUser[];
}

@Injectable({
  providedIn: 'root'
})
export class NewSdRequestFormService {
  private sdRequestForm: BehaviorSubject<FormGroup> = new BehaviorSubject(
    this.formBuilder.group({
      service_id: [''],
      service_name: [''],
      priority: [ClaimPriorities.DEFAULT, Validators.required],
      finished_at_plan: [moment(), Validators.required],
      comment: [''],
      attrs: this.formBuilder.group({
        description: ['', Validators.required]
      }),
      source_snapshot: this.formBuilder.group({
        id_tn: [null],
        tn: [null, Validators.required],
        fio: ['', Validators.required],
        dept: ['', Validators.required],
        email: [''],
        tel: [''],
        mobile: [''],
        invent_num: [''],
        svt_item_id: [null],
        svt_item: ['']
      }),
      attachments: [[]],
      tags: [[{ name: 'свободная_заявка' }]],
      users: [[this.authHelper.getJwtPayload()]],
    })
  );
  sdRequestForm$: Observable<FormGroup> = this.sdRequestForm.asObservable();
  searchUser: FormControl = new FormControl();

  /**
   * Возвращает экземпляр формы
   */
  get form(): FormGroup {
    return this.sdRequestForm.getValue();
  }

  /**
   * Возвращает список пользователей, сгруппированный по группам.
   */
  get userGroups$(): Observable<UserGroup[]> {
    const filterObs = this.searchUser.valueChanges.pipe(startWith(''));

    return combineLatest([filterObs, this.userFacade.users$]).pipe(
      map(data => data[1].filter(user => user.fio.toLowerCase().includes(data[0].toLowerCase()))),
      map(users => {
        return users.reduce((acc, user) => {
          const accEl = acc.find((el: UserGroup) => el.group && el.group.id === user.group_id);

          if (accEl) {
            accEl.users.push(user);
          } else {
            const res: UserGroup = {
              group: user.group,
              users: [user]
            };

            acc.push(res);
          }

          return acc;
        }, []);
      })
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private employeeApi: EmployeeApi,
    private sdApi: ServiceDeskApi,
    private svtApi: SvtApi,
    private userFacade: UserFacade,
    private authHelper: AuthHelper,
  ) {
    this.loadServices();
  }

  /**
   * Сохраняет форму.
   */
  save(): void {
    console.log(this.form.getRawValue());
  }

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

  /**
   * Очищает поле поиска исполнителя.
   */
  clearSearchUser(): void {
    this.searchUser.setValue('');
  }

  /**
   * Обрабатывает событие выбора/удаленеия исполнителя в заявке.
   *
   * @param event - объект события
   */
  selectUserEvent(event: MatListOption): void {
    const currentArr = this.form.get('users').value.slice();

    if (event.selected) {
      currentArr.push(event.value);
      this.form.get('users').setValue(currentArr);
    } else {
      const newArr = currentArr.filter((el: IUser) => el.id !== event.value.id);

      this.form.get('users').setValue(newArr);
    }
  }

  /**
   * Проверяет, является ли указанный пользователь текущим пользователем системы.
   *
   * @param user - пользователь
   */
  isCurrentUser(user: IUser): boolean {
    return this.authHelper.getJwtPayload().id === user.id;
  }

  // TODO: Перенести данные в стор.
  loadServices(): Observable<IService[]> {
    return this.sdApi.getServices();
  }
}
