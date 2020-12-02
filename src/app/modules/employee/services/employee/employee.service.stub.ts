import { of, Observable } from 'rxjs';

import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

export class EmployeeServiceStub {
  getEmployees(): Observable<IBaseEmployee[]> { return of([]); }
}
