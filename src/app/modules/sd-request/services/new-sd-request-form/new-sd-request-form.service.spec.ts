import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, skip } from 'rxjs/operators';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';

import { NewSdRequestFormService } from './new-sd-request-form.service';
import { EmployeeApi } from '@modules/employee/api/employee.api';
import { EmployeeApiStub } from '@modules/employee/api/employee.api.stub';
import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { ServiceDeskApiStub } from '@modules/sd-request/api/service-desk/service-desk.api.stub';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { IServiceBuilder } from '@modules/sd-request/builders/i-service.builder';
import { SvtApi } from '@modules/sd-request/api/svt/svt.api';
import { SvtApiStub } from '@modules/sd-request/api/svt/svt.api.stub';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { ISvtItemBuilder } from '@modules/sd-request/builders/i-svt-item.builder';
import { UserFacade } from '@modules/user/facades/user.facade';
import { UserFacadeStub } from '@modules/user/facades/user.facade.stub';
import { IUserBuilder } from '@modules/user/builders/i-user.builder';
import { UserGroup } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';

describe('NewSdRequestFormService', () => {
  let service: NewSdRequestFormService;
  let employeeApi: EmployeeApi;
  let svtItemApi: SvtApi;
  let userFacade: UserFacade;
  let authHelper: AuthHelper;

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
    svtItemApi = TestBed.inject(SvtApi);
    userFacade = TestBed.inject(UserFacade);
    authHelper = TestBed.inject(AuthHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('"searchService" input', () => {
    beforeEach(() => {
      service.isNoService.setValue(true);
    });

    describe('when "isNoService" enabled', () => {
      it('should disable "input"', () => {
        expect(service.searchService.disabled).toBeTrue();
      });

      it('should set null to service fields of form', () => {
        service.sdRequestForm$.subscribe(form => {
          expect(form.get('service_id').value).toBeNull();
          expect(form.get('service_name').value).toBeNull();
        });
      });
    });

    describe('when "isNoService" disabled', () => {
      let sdService: IService;

      beforeEach(() => {
        sdService = new IServiceBuilder().testBuild()
        service.service = sdService;
        service.isNoService.setValue(false);
      });

      it('should enable "input" ', () => {
        expect(service.searchService.disabled).toBeFalse();
      });

      it('should fill service fields with service data', () => {
        service.sdRequestForm$.subscribe(form => {
          expect(form.get('service_id').value).toEqual(sdService.id);
          expect(form.get('service_name').value).toEqual(sdService.name);
        });
      });
    });
  });

  describe('"searchSvtItem" input', () => {
    beforeEach(() => {
      service.isNoSvtItem.setValue(true);
    });

    describe('when "isNoSvtItem" enabled', () => {
      it('should disable "input"', () => {
        expect(service.searchSvtItem.disabled).toBeTrue();
      });

      it('should set null to svtItem fields of form', () => {
        service.sdRequestForm$.subscribe(form => {
          const ssForm = form.get('source_snapshot') as FormGroup;

          expect(ssForm.get('invent_num').value).toBeUndefined();
          expect(ssForm.get('svt_item_id').value).toBeUndefined();
          expect(ssForm.get('svt_item').value).toEqual('');
        });
      });
    });

    describe('when "isNoSvtItem" disabled', () => {
      it('should enable "input" ', () => {
        const svtItem = new ISvtItemBuilder().testBuild();
        service.svtItem = svtItem;
        service.isNoSvtItem.setValue(false);

        expect(service.searchService.disabled).toBeFalse();
      });
    });
  });

  describe('"service" setter', () => {
    let sdService: IService;

    beforeEach(() => {
      sdService = new IServiceBuilder().testBuild();
      service.service = sdService;
    });

    it('should set "selectedService" attribute', () => {
      expect(service.selectedService).toEqual(sdService);
    });

    it('should set form attributes from selected service', () => {
      service.sdRequestForm$.subscribe(form => {
        expect(form.get('service_id').value).toEqual(sdService.id);
        expect(form.get('service_name').value).toEqual(sdService.name);
      });
    });
  });

  describe('"svtItem" setter', () => {
    let svtItem: ISvtItem;

    beforeEach(() => {
      svtItem = new ISvtItemBuilder().testBuild();
      service.svtItem = svtItem;
    });

    it('should set "selectedSvtItem" attribute', () => {
      expect(service.selectedSvtItem).toEqual(svtItem);
    });

    it('should set form attributes from selected item', () => {
      service.sdRequestForm$.subscribe(form => {
        const ssForm = form.get('source_snapshot') as FormGroup;

        expect(ssForm.get('invent_num').value).toEqual(svtItem.invent_num);
        expect(ssForm.get('svt_item_id').value).toEqual(svtItem.item_id);
        expect(ssForm.get('svt_item').value).toEqual(`${svtItem.type.short_description} ${svtItem.item_model}`);
      });
    });
  });

  describe('"services$" getter', () => {
    it('should return list of services which includes term', fakeAsync(() => {
      const services = [new IServiceBuilder().name('First').testBuild(), new IServiceBuilder().name('Second').testBuild()];
      service.avaliableServices$ = of(services);

      service.services$.pipe(debounceTime(300)).subscribe(result => {
        expect(result).toEqual([services[0]]);
      });

      service.searchService.setValue('Firs');
      tick(300);
    }));
  });

  describe('"anySvtItems$" getter', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(svtItemApi, 'getAnyItems');
    });

    it('should return list of svt items which includes term', (done) => {
      const svtItems = [
        new ISvtItemBuilder().short_item_model('First').testBuild(),
        new ISvtItemBuilder().short_item_model('Second').testBuild()
      ];
      spy.and.returnValue(of(svtItems));

      service.anySvtItems$.subscribe(result => {
        expect(result).toEqual(svtItems);
        done();
      });

      service.searchSvtItem.setValue('test');
    });

    it('should call "getAnyItems" method of SvtItemApi service with received term', (done) => {
      const term = 'test_term';
      spy.and.returnValue(of([]));

      service.anySvtItems$.subscribe(() => {
        expect(spy).toHaveBeenCalledWith(term);
        done();
      });

      service.searchSvtItem.setValue(term);
    });
  });

  describe('"userSvtItems$" getter', () => {
    it('should reutrn list of svt items which belongs to user', (done) => {
      const svtItems = [
        new ISvtItemBuilder().short_item_model('First').testBuild(),
        new ISvtItemBuilder().short_item_model('Second').testBuild()
      ];
      spyOn(svtItemApi, 'getUserItems').and.returnValue(of(svtItems));

      service.userSvtItems$.subscribe(result => {
        expect(result).toEqual(svtItems);
        done();
      });

      const ssForm = service.form.get('source_snapshot') as FormGroup;
      ssForm.get('id_tn').setValue('test');
    });
  });

  describe('#save', () => {
    it('should save form', () => {
      // TODO: Сделать тест
    });
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

  describe('#clearSearchService', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOnProperty(service, 'service', 'set');
      service.clearSearchService();
    });

    it('should set empty array to "searchService" attribute', () => {
      expect(service.searchService.value).toEqual(null);
    });

    it('should call "service" setter with empty object', () => {
      expect(spy).toHaveBeenCalledWith({ });
    });
  });

  describe('#clearSearchSvtItem', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOnProperty(service, 'svtItem', 'set');
      service.clearSearchSvtItem();
    });

    it('should set empty array to "searchSvtItem" attribute', () => {
      expect(service.searchSvtItem.value).toEqual(null);
    });

    it('should call "stvItem" setter with empty object', () => {
      expect(spy).toHaveBeenCalledWith({ });
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
