import { BehaviorSubject } from 'rxjs';

import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';

export class EmployeeFacadeStub {
  employees$ = new BehaviorSubject<IBaseEmployee[]>([]);
  searchEmployees(): void { }
  createGroups(employees: IBaseEmployee[]): IBaseEmployeeGroup[] { return []; }
}
