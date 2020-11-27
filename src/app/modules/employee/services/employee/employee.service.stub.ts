import { of, Observable } from 'rxjs';

import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

export class ClaimServiceStub {
  getEmployees(): Observable<IBaseEmployee[]> { return of([]); }
}
