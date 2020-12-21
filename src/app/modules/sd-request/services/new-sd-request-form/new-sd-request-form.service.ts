import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, combineLatest } from 'rxjs';
import { mergeMap, map, startWith, debounceTime, filter, catchError } from 'rxjs/operators';
import { MatListOption } from '@angular/material/list';
import * as moment from 'moment';

import { EmployeeApi } from '@modules/employee/api/employee.api';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { ITag } from '@shared/interfaces/tag.interface';
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

  selectedService: IService;
  searchService: FormControl = new FormControl();
  isNoService: FormControl = new FormControl(false);
  avaliableServices$: Observable<IService[]> = of([]);

  selectedSvtItem: ISvtItem;
  searchSvtItem: FormControl = new FormControl();
  isNoSvtItem: FormControl = new FormControl(false);
  svtItemList: FormControl = new FormControl();

  searchUser: FormControl = new FormControl();

  /**
   * Записывает данные выбранной услуги в атрибуты формы.
   */
  set service(service: IService) {
    this.selectedService = service;
    this.updateServiceForm(service);
  }

  /**
   * Записывает данные выбранной ВТ в атрибуты формы.
   */
  set svtItem(svtItem: ISvtItem) {
    this.selectedSvtItem = svtItem;
    this.updateSvtItem(svtItem);
  }

  /**
   * Возвращает экземпляр формы
   */
  get form(): FormGroup {
    return this.sdRequestForm.getValue();
  }

  /**
   * Подписывается на поле поиска услуги и возвращает отфильтрованный список услуг.
   */
  get services$(): Observable<IService[]> {
    return this.searchService.valueChanges.pipe(
      startWith(''),
      filter(term => typeof term === 'string'),
      mergeMap(term => {
        return this.avaliableServices$.pipe(map(services => {
          if (!term) {
            return services;
          }

          return services.filter(service => service.name.toLowerCase().includes(term.toLowerCase()));
        }));
      })
    );
  }

  /**
   * Подписывается на поле поиска ВТ и возвращает массив найденной техники.
   */
  get anySvtItems$(): Observable<ISvtItem[]> {
    return this.searchSvtItem.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      mergeMap(term => {
        return this.svtApi.getAnyItems(term)
          .pipe(catchError(error => {
            // TODO: Добавить вывод ошибки через всплывающее окно.
            this.searchSvtItem.setErrors({ serverError: true});

            return of([]);
          }));
      })
    );
  }

  /**
   * Подписывается на поле id_tn и по его данным ищет связанную ВТ.
   */
  get userSvtItems$(): Observable<ISvtItem[]> {
    return this.form.get('source_snapshot').get('id_tn').valueChanges.pipe(
      debounceTime(300),
      mergeMap(idTn => this.svtApi.getUserItems(idTn))
    );
  }

  /**
   * Возвращает доступный список тегов.
   */
  get tags$(): Observable<ITag[]> {
    return of([]);
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
    this.processingIsNoService();
    this.processingIsNoSvtItem();
    this.loadServices();
  }

  /**
   * Сохраняет форму.
   */
  save(): void {
    console.log(this.form.getRawValue());
  }

  /**
   * Поиск работников по параметру, зависящему от полученных данных.
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
   * Очищает поле поиска услуги и соответствующие поля формы, которая отправится на сервер.
   */
  clearSearchService(): void {
    this.searchService.setValue(null);
    this.service = { } as IService;
  }

  /**
   * Очищает поле поиска ВТ и соответствующие поля формы, которая отправится на сервер.
   */
  clearSearchSvtItem(): void {
    this.searchSvtItem.setValue(null);
    this.svtItem = { } as ISvtItem;
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

  /**
   * Подписывается на поле "isNoService" и по результатам активирует/отключает поле "searchService".
   */
  private processingIsNoService(): void {
    this.isNoService.valueChanges.subscribe(isNoService => {
      if (isNoService) {
        this.searchService.disable();
        this.updateServiceForm(null);
      } else {
        this.searchService.enable();
        this.service = this.selectedService;
      }
    });
  }

  /**
   * Подписывается на поле "isNoSvtItem" и по результатам активирует/отключает поле "userSvtItems".
   */
  private processingIsNoSvtItem(): void {
    this.isNoSvtItem.valueChanges.subscribe(isNoSvtItem => {
      if (isNoSvtItem) {
        this.searchSvtItem.disable();
        this.svtItemList.disable();
        this.svtItem = { } as ISvtItem;
      } else {
        this.searchSvtItem.enable();
        this.svtItemList.enable();
        this.svtItem = this.selectedSvtItem;
      }
    });
  }

  // TODO: Перенести данные в стор.
  private loadServices(): void {
    this.avaliableServices$ = this.sdApi.getServices().pipe(catchError(error => {
      // TODO: Добавить вывод ошибки через всплывающее окно.
      this.searchService.setErrors({ serverError: true});

      return of([]);
    }));
  }

  /**
   * Обновляет поля формы, связанные с выбранной услугой.
   *
   * @param service - услуга
   */
  private updateServiceForm(service: IService): void {
    this.form.patchValue({
      service_id: service?.id || null,
      service_name: service?.name || null
    });
  }

  /**
   * Обновить поля формы, связанные с выбранной ВТ.
   *
   * @param svtItem - ВТ.
   */
  private updateSvtItem(svtItem: ISvtItem): void {
    const sourceSnapshotForm = this.form.get('source_snapshot') as FormGroup;

    sourceSnapshotForm.patchValue({
      invent_num: svtItem.invent_num,
      svt_item_id: svtItem.item_id,
      svt_item: svtItem.type ? `${svtItem.type.short_description} ${svtItem.item_model}` : ''
    });
  }
}
