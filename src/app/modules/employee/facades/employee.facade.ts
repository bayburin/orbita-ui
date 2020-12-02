import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { EmployeeService } from '@modules/employee/services/employee/employee.service';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFacade {
  constructor(private employeeService: EmployeeService) { }

  loadEmployees(term: string): Observable<IBaseEmployee[]> {
    return this.employeeService.getEmployees(this.isNumber(term) ? 'personnelNo' : 'fullName', term);
  }

  private isNumber(str: string): boolean {
    return !isNaN(parseFloat(str));
  }
}
