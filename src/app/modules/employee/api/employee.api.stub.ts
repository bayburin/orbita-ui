import { of, Observable } from 'rxjs';

import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

export class EmployeeApiStub {
  getEmployees(key?: string, value?: string): Observable<IBaseEmployee[]> { return of([new IBaseEmployeeBuilder().build()]); }
}
