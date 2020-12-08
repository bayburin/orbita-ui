import { Observable, of, BehaviorSubject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { IService } from '@modules/sd-request/interfaces/service.interface';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { EmployeeGroup } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';

export class NewSdRequestFormServiceStub {
  private sdRequestForm: BehaviorSubject<FormGroup> = new BehaviorSubject(
    new FormGroup({
      service_id: new FormControl(''),
      service_name: new FormControl(''),
      attrs: new FormGroup({
        description: new FormControl('', [Validators.required]),
      }),
      attachments: new FormControl([]),
      source_snapshot: new FormGroup({
        id_tn: new FormControl(''),
        tn: new FormControl('', [Validators.required]),
        fio: new FormControl('', [Validators.required]),
        dept: new FormControl('', [Validators.required]),
        email: new FormControl(''),
        tel: new FormControl(''),
        mobile: new FormControl('')
      })
    })
  );
  sdRequestForm$: Observable<FormGroup> = this.sdRequestForm.asObservable();
  selectedEmployee: IBaseEmployee;
  searchEmployee: FormControl = new FormControl();
  searchService: FormControl = new FormControl();
  isUserInfoManually: FormControl = new FormControl(false);
  isNoService: FormControl = new FormControl(false);
  avaliableServices$: Observable<IService[]> = of([]);

  set sourceSnapshot(employee: IBaseEmployee) {}
  set service(service: IService) {}
  get employeeGroups$(): Observable<EmployeeGroup[]> { return of([]); }
  get services$(): Observable<IService[]> { return of([]); }

  save(): void { }
  clearEmployee(): void { }
  clearService(): void { }
  addAttachments(files: FileList): void { }
  removeAttachment(): void { }
}
