import { BehaviorSubject } from 'rxjs';

import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

export class EmployeeFacadeStub {
  employees$ = new BehaviorSubject<IBaseEmployee[]>([]);
  searchEmployees(): void { }
}
