import { Observable, of, BehaviorSubject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

import { IService } from '@modules/sd-request/interfaces/service.interface';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { UserGroup } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { ITag } from '@shared/interfaces/tag.interface';
import { IUser } from '@modules/user/interfaces/user.interface';
import { ClaimPriorities } from '@modules/claim/enums/claim-priorities.enum';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';

export class NewSdRequestFormServiceStub {
  private sdRequestForm: BehaviorSubject<FormGroup> = new BehaviorSubject(
    new FormGroup({
      service_id: new FormControl(''),
      service_name: new FormControl(''),
      priority: new FormControl(ClaimPriorities.DEFAULT, [Validators.required]),
      finished_at_plan: new FormControl(moment(), [Validators.required]),
      comment: new FormControl(''),
      attrs: new FormGroup({
        description: new FormControl('', [Validators.required]),
      }),
      source_snapshot: new FormGroup({
        id_tn: new FormControl(''),
        tn: new FormControl('', [Validators.required]),
        fio: new FormControl('', [Validators.required]),
        dept: new FormControl('', [Validators.required]),
        email: new FormControl(''),
        tel: new FormControl(''),
        mobile: new FormControl('')
      }),
      attachments: new FormControl([]),
      tags: new FormControl([]),
      users: new FormControl([])
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

  set employee(employee: IBaseEmployee) { }
  set service(service: IService) { }
  set svtItem(svtItem: ISvtItem) { }
  get form(): FormGroup { return this.sdRequestForm.getValue(); }
  get services$(): Observable<IService[]> { return of([]); }
  get anySvtItems$(): Observable<ISvtItem[]> { return of([]); }
  get userSvtItems$(): Observable<ISvtItem[]> { return of([]); }
  get tags$(): Observable<ITag[]> { return of([]); }
  get userGroups$(): Observable<UserGroup[]> { return of([]); }

  save(): void { }
  searchEmployees(): Observable<IBaseEmployeeGroup[]> { return of([]); }
  clearSearchService(): void { }
  clearSearchSvtItem(): void { }
  clearSearchUser(): void { }
  selectUserEvent(event: any): void { }
  isCurrentUser(user: IUser) {  }
}
