import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EmployeeFacade } from './employee.facade';
import { EmployeeApi } from '@modules/employee/api/employee.api';
import { EmployeeApiStub } from '@modules/employee/api/employee.api.stub';

describe('EmployeeFacade', () => {
  let facade: EmployeeFacade;
  let employeeApi: EmployeeApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: EmployeeApi, useClass: EmployeeApiStub }]
    });

    facade = TestBed.inject(EmployeeFacade);
    employeeApi = TestBed.inject(EmployeeApi);
  });

  describe('#loadEmployees', () => {
    it('should call "getEmployees" method with "personnelNo" attribute', () => {
      const spy = spyOn(employeeApi, 'getEmployees').and.returnValue(of([]));
      const term = 'test';

      facade.loadEmployees(term).subscribe(() => {
        expect(spy).toHaveBeenCalledWith('fullName', term);
      });
    });

    it('should call "getEmployees" method with "fullName" attribute', () => {
      const spy = spyOn(employeeApi, 'getEmployees').and.returnValue(of([]));
      const term = '123';

      facade.loadEmployees(term).subscribe(() => {
        expect(spy).toHaveBeenCalledWith('personnelNo', term);
      });
    });
  });
});
