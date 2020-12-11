import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeMap, map, startWith, debounceTime, filter, catchError } from 'rxjs/operators';

import { EmployeeApi } from '@modules/employee/api/employee.api';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { ITag } from '@shared/interfaces/tag.interface';
import { SvtApi } from '@modules/sd-request/api/svt/svt.api';

export interface EmployeeGroup {
  dept: number;
  employees: IBaseEmployee[];
}

export interface FileGroup {
  file: File;
  data: string | ArrayBuffer;
}

@Injectable({
  providedIn: 'root'
})
export class NewSdRequestFormService {
  private sdRequestForm: BehaviorSubject<FormGroup> = new BehaviorSubject(
    this.formBuilder.group({
      service_id: [''],
      service_name: [''],
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
      tags: [[{ name: 'свободная_заявка' }]]
    })
  );
  sdRequestForm$: Observable<FormGroup> = this.sdRequestForm.asObservable();
  selectedEmployee: IBaseEmployee;
  searchEmployee: FormControl = new FormControl();
  selectedService: IService;
  searchService: FormControl = new FormControl();
  isUserInfoManually: FormControl = new FormControl(false);
  isNoService: FormControl = new FormControl(false);
  isNoSvtItem: FormControl = new FormControl(false);
  avaliableServices$: Observable<IService[]> = of([]);
  searchSvtItem: FormControl = new FormControl();
  selectedSvtItem: ISvtItem;
  svtItemList: FormControl = new FormControl();

  /**
   * Записывает данные выбранного работника в атрибуты формы.
   *
   * @employee - работник
   */
  set employee(employee: IBaseEmployee) {
    const sourceSnapshotForm = this.form.get('source_snapshot') as FormGroup;

    this.selectedEmployee = employee;
    sourceSnapshotForm.patchValue({
      id_tn: employee.id,
      tn: employee.personnelNo,
      fio: employee.fullName,
      dept: employee.departmentForAccounting,
      email: employee.emailText,
      tel: employee.phoneText
    });
  }

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
   * Подписывается на поле поиска работника и возвращает массив работников, сгруппированный по отделам.
   */
  get employeeGroups$(): Observable<EmployeeGroup[]> {
    return this.searchEmployee.valueChanges.pipe(
      startWith(''),
      filter(term => this.isNumber(term) ? true : term && term.length >= 2),
      debounceTime(300),
      mergeMap(term => {
        return this.employeeApi.getEmployees(this.isNumber(term) ? 'personnelNo' : 'fullName', term)
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

  constructor(
    private formBuilder: FormBuilder,
    private employeeApi: EmployeeApi,
    private sdApi: ServiceDeskApi,
    private svtApi: SvtApi
  ) {
    this.processingIsUserInfoManually();
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
   * Очищает поле поиска работника и соответствующие поля формы, которая отправится на сервер.
   */
  clearSearchEmployee(): void {
    this.searchEmployee.setValue(null);
    this.employee = { } as IBaseEmployee;
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
   * Добавляет указанные файлы к форме.
   *
   * @param files - массив файлов
   */
  addAttachments(files: FileList): void {
    const attachments = this.form.get('attachments') as FormControl;
    const currentArr = attachments.value.slice();
    const newArr: FileGroup[] = [];

    for (const file of Array.from(files)) {
      const fileObj: FileGroup = {
        file,
        data: null
      };

      this.convertToBase64(file).subscribe(data => fileObj.data = data);
      newArr.push(fileObj);
    }

    attachments.setValue([...currentArr, ...newArr]);
  }

  removeAttachment(file: File): void {
    const attachments = this.form.get('attachments') as FormControl;
    const currentArr = attachments.value.slice();
    const newArr = currentArr.filter((el: FileGroup) => el.file !== file);

    attachments.setValue(newArr);
  }

  /**
   * Проверяет, содержит ли полученная строка только числа.
   */
  private isNumber(str: string): boolean {
    return !isNaN(parseFloat(str));
  }

  /**
   * Подписывается на поле "isUserInfoManually" и по результатам активирует/отключает поле "searchEmployee".
   */
  private processingIsUserInfoManually(): void {
    this.isUserInfoManually.valueChanges.subscribe(isActive => {
      if (isActive) {
        this.searchEmployee.disable();
      } else {
        this.searchEmployee.enable();
      }
    });
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
   * Конвертирует файл в base64.
   *
   * @param file - преоразуемый файл.
   */
  private convertToBase64(file: File): Observable<string | ArrayBuffer> {
    return new Observable(subscriber => {
      const reader = new FileReader();

      reader.onload = () => {
        subscriber.next(reader.result);
        subscriber.complete();
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * Обновляет поля формы, связанной с выбранной услугой.
   *
   * @param service - услуга
   */
  private updateServiceForm(service: IService) {
    this.form.patchValue({
      service_id: service?.id || null,
      service_name: service?.name || null
    });
  }

  private updateSvtItem(svtItem: ISvtItem) {
    const sourceSnapshotForm = this.form.get('source_snapshot') as FormGroup;

    sourceSnapshotForm.patchValue({
      invent_num: svtItem.invent_num,
      svt_item_id: svtItem.item_id,
      svt_item: svtItem.type ? `${svtItem.type.short_description} ${svtItem.item_model}` : ''
    });
  }
}
