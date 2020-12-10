import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeMap, map, startWith, debounceTime, filter, catchError } from 'rxjs/operators';

import { EmployeeApi } from '@modules/employee/api/employee.api';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { ITag } from '@shared/interfaces/tag.interface';

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
        id_tn: [''],
        tn: ['', Validators.required],
        fio: ['', Validators.required],
        dept: ['', Validators.required],
        email: [''],
        tel: [''],
        mobile: ['']
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
  avaliableServices$: Observable<IService[]> = of([]);

  /**
   * Записывает данные выбранного работника в атрибуты формы.
   *
   * @employee - работник
   */
  set sourceSnapshot(employee: IBaseEmployee) {
    const currentForm = this.sdRequestForm.getValue();
    const sourceSnapshotForm = currentForm.get('source_snapshot') as FormGroup;

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
   * Возвращает доступный список тегов.
   */
  get tags$(): Observable<ITag[]> {
    return of([]);
  }

  constructor(
    private formBuilder: FormBuilder,
    private employeeApi: EmployeeApi,
    private sdApi: ServiceDeskApi
  ) {
    this.processingIsUserInfoManually();
    this.processingIsNoService();
    this.loadServices();
  }

  /**
   * Сохраняет форму.
   */
  save(): void {
    console.log(this.sdRequestForm.getValue().getRawValue());
  }

  /**
   * Очищает поле поиска работника и соответствующие поля формы, которая отправится на сервер.
   */
  clearEmployee(): void {
    this.searchEmployee.setValue(null);
    this.sourceSnapshot = { } as IBaseEmployee;
  }

  /**
   * Очищает поле поиска услуги и соответствующие поля формы, которая отправится на сервер.
   */
  clearService(): void {
    this.searchService.setValue(null);
    this.service = { } as IService;
  }

  /**
   * Добавляет указанные файлы к форме.
   *
   * @param files - массив файлов
   */
  addAttachments(files: FileList): void {
    const currentForm = this.sdRequestForm.getValue();
    const attachments = currentForm.get('attachments') as FormControl;
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
    const currentForm = this.sdRequestForm.getValue();
    const attachments = currentForm.get('attachments') as FormControl;
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

  private updateServiceForm(service: IService | null) {
    const currentForm = this.sdRequestForm.getValue();

    currentForm.patchValue({
      service_id: service?.id || null,
      service_name: service?.name || null
    });
  }
}
