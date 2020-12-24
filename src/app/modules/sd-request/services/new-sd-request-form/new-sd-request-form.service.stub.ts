import { Observable, of } from 'rxjs';

import { IService } from '@modules/sd-request/interfaces/service.interface';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';

export class NewSdRequestFormServiceStub {
  save(): void { }
  searchEmployees(): Observable<IBaseEmployeeGroup[]> { return of([]); }
  searchSvtItems(): Observable<ISvtItem[]> { return of([]); }
  loadUserSvtItems(): Observable<ISvtItem[]> { return of([]); }
  loadServices(): Observable<IService[]> { return of([]); }
}
