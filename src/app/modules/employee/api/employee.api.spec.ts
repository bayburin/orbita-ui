import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { EmployeeApi } from './employee.api';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

describe('EmployeeApi', () => {
  let service: EmployeeApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(EmployeeApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getEmployees', () => {
    const employees = [{ id: 1 } as IBaseEmployee, { id: 2 } as IBaseEmployee];
    const api = `${environment.serverApi}/v1/employees`;

    it('should return Observable with array of claims', () => {
      service.getEmployees().subscribe(result => {
        expect(result).toEqual(employees);
      });

      httpMock.expectOne({
        method: 'GET',
        url: api
      }).flush(employees);
    });
  });
});
