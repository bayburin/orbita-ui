import { Observable, of } from 'rxjs';

import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

export class EmployeeFacadeStub {
  loadEmployees(): Observable<IBaseEmployee[]> { return of([new IBaseEmployeeBuilder().build()]); }
}
