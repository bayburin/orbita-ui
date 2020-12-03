import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EmployeeApi } from '@modules/employee/api/employee.api';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFacade {
  constructor(private employeeApi: EmployeeApi) { }

  loadEmployees(term: string): Observable<IBaseEmployee[]> {
    return this.employeeApi.getEmployees(this.isNumber(term) ? 'personnelNo' : 'fullName', term);
  }

  private isNumber(str: string): boolean {
    return !isNaN(parseFloat(str));
  }
}
