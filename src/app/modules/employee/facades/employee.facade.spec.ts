import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EmployeeFacade } from './employee.facade';
import { EmployeeService } from '@modules/employee/services/employee/employee.service';
import { EmployeeServiceStub } from '@modules/employee/services/employee/employee.service.stub';

describe('EmployeeFacade', () => {
  let facade: EmployeeFacade;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: EmployeeService, useClass: EmployeeServiceStub }]
    });

    facade = TestBed.inject(EmployeeFacade);
    employeeService = TestBed.inject(EmployeeService);
  });

  describe('#loadEmployees', () => {
    it('should call "getEmployees" method with "personnelNo" attribute', () => {
      const spy = spyOn(employeeService, 'getEmployees').and.returnValue(of([]));
      const term = 'test';

      facade.loadEmployees(term).subscribe(() => {
        expect(spy).toHaveBeenCalledWith('fullName', term);
      });
    });

    it('should call "getEmployees" method with "fullName" attribute', () => {
      const spy = spyOn(employeeService, 'getEmployees').and.returnValue(of([]));
      const term = '123';

      facade.loadEmployees(term).subscribe(() => {
        expect(spy).toHaveBeenCalledWith('personnelNo', term);
      });
    });
  });
});
