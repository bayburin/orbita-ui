import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { skip } from 'rxjs/operators';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';

import { NewSdRequestFormService } from './new-sd-request-form.service';
import { EmployeeApi } from '@modules/employee/api/employee.api';
import { EmployeeApiStub } from '@modules/employee/api/employee.api.stub';
import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { ServiceDeskApiStub } from '@modules/sd-request/api/service-desk/service-desk.api.stub';
import { SvtApi } from '@modules/sd-request/api/svt/svt.api';
import { SvtApiStub } from '@modules/sd-request/api/svt/svt.api.stub';
import { UserFacade } from '@modules/user/facades/user.facade';
import { UserFacadeStub } from '@modules/user/facades/user.facade.stub';
import { IUserBuilder } from '@modules/user/builders/i-user.builder';
import { UserGroup } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import { IBaseEmployeeGroupBuilder } from '@modules/employee/builders/base-employee-group.builder';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { ISvtItemBuilder } from '@modules/sd-request/builders/i-svt-item.builder';

describe('NewSdRequestFormService', () => {
  let service: NewSdRequestFormService;
  let employeeApi: EmployeeApi;
  let svtApi: SvtApi;
  let userFacade: UserFacade;
  let authHelper: AuthHelper;
  let spy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FormBuilder,
        { provide: EmployeeApi, useClass: EmployeeApiStub },
        { provide: ServiceDeskApi, useClass: ServiceDeskApiStub },
        { provide: SvtApi, useClass: SvtApiStub },
        { provide: UserFacade, useClass: UserFacadeStub },
        { provide: AuthHelper, useClass: AuthHelperStub }
      ]
    });

    service = TestBed.inject(NewSdRequestFormService);
    employeeApi = TestBed.inject(EmployeeApi);
    svtApi = TestBed.inject(SvtApi);
    userFacade = TestBed.inject(UserFacade);
    authHelper = TestBed.inject(AuthHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('"userGroups$" getter', () => {
    it('should return array of UserGroup', (done) => {
      const user = new IUserBuilder().testBuild();
      const resultGroup: UserGroup = {
        group: user.group,
        users: [user]
      };

      userFacade.users$ = of([user]);
      service.userGroups$.subscribe(result => {
        expect(result).toEqual([resultGroup]);
        done();
      });
    });

    it('should filter array if "searchUser" field receviving any data', (done) => {
      const fio = 'test';
      const user = new IUserBuilder().fio(fio).testBuild();
      const resultGroup: UserGroup = {
        group: user.group,
        users: [user]
      };

      userFacade.users$ = of([new IUserBuilder().testBuild(), user]);
      service.userGroups$.pipe(skip(1)).subscribe(result => {
        expect(result).toEqual([resultGroup]);
        done();
      });

      service.searchUser.setValue(fio);
    });
  });

  describe('#save', () => {
    it('should save form', () => {
      // TODO: Сделать тест
    });
  });

  describe('#searchEmployee', () => {
    let employee: IBaseEmployee;

    beforeEach(() => {
      employee = new IBaseEmployeeBuilder().build();
      spy = spyOn(employeeApi, 'getEmployees').and.returnValue(of([employee]));
    });

    it('should call "getEmployees" method with "phoneText" attribute if receive phone number', () => {
      service.searchEmployees('12-34').subscribe(() => {
        expect(spy).toHaveBeenCalledWith('phoneText', '12-34');
      });
    });

    it('should call "getEmployees" method with "personnelNo" attribute if receive number', () => {
      service.searchEmployees('12345').subscribe(() => {
        expect(spy).toHaveBeenCalledWith('personnelNo', '12345');
      });
    });

    it('should call "getEmployees" method with "fullName" attribute if receive string', () => {
      service.searchEmployees('test fio').subscribe(() => {
        expect(spy).toHaveBeenCalledWith('fullName', 'test fio');
      });
    });

    it('create array of IBaseEmployeeGroup objects', () => {
      const group = new IBaseEmployeeGroupBuilder()
                      .dept(employee.departmentForAccounting)
                      .employees([employee])
                      .testBuild();

      service.searchEmployees('test fio').subscribe(data => {
        expect(data).toEqual([group]);
      });
    });
  });

  describe('#searchSvtItems', () => {
    let svtItem: ISvtItem;

    beforeEach(() => {
      svtItem = new ISvtItemBuilder().testBuild();
      spy = spyOn(svtApi, 'getAnyItems').and.returnValue(of([svtItem]));
    });

    it('should call "getAnyItems" method', () => {
      service.searchSvtItems('invent_num').subscribe(() => {
        expect(spy).toHaveBeenCalledWith('invent_num');
      });
    });

    it('should return data from "getAnyItems" method', () => {
      service.searchSvtItems('invent_num').subscribe(data => {
        expect(data).toEqual([svtItem]);
      });
    });
  });

  describe('#loadUserSvtItems', () => {
    let svtItem: ISvtItem;

    beforeEach(() => {
      svtItem = new ISvtItemBuilder().testBuild();
      spy = spyOn(svtApi, 'getUserItems').and.returnValue(of([svtItem]));
    });

    it('should call "getUserItems" method', () => {
      service.loadUserSvtItems(123).subscribe(() => {
        expect(spy).toHaveBeenCalledWith(123);
      });
    });

    it('should return data from "getUserItems" method', () => {
      service.loadUserSvtItems(123).subscribe(data => {
        expect(data).toEqual([svtItem]);
      });
    });
  });

  describe('#clearSearchUser', () => {
    it('should set empty string to "searchUser" field', () => {
      service.searchUser.setValue('test');
      service.clearSearchUser();

      expect(service.searchUser.value).toEqual('');
    });
  });

  describe('#isCurrentUser', () => {
    it('should return true if received user is current user', () => {
      const user = new IUserBuilder().testBuild();

      spyOn(authHelper, 'getJwtPayload').and.returnValue(user);

      expect(service.isCurrentUser(user)).toBeTrue();
    });

    it('should return false if received user is not current user', () => {
      const user = new IUserBuilder().testBuild();

      expect(service.isCurrentUser(user)).toBeFalse();
    });
  });
});
