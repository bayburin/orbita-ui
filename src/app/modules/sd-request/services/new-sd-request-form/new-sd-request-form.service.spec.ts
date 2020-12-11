import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NewSdRequestFormService, EmployeeGroup } from './new-sd-request-form.service';
import { EmployeeApi } from '@modules/employee/api/employee.api';
import { EmployeeApiStub } from '@modules/employee/api/employee.api.stub';
import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { ServiceDeskApiStub } from '@modules/sd-request/api/service-desk/service-desk.api.stub';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import { IService } from '@modules/sd-request/interfaces/service.interface';
import { IServiceBuilder } from '@modules/sd-request/builders/i-service.builder';
import { SvtApi } from '@modules/sd-request/api/svt/svt.api';
import { SvtApiStub } from '@modules/sd-request/api/svt/svt.api.stub';
import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';
import { ISvtItemBuilder } from '@modules/sd-request/builders/i-svt-item.builder';


describe('NewSdRequestFormService', () => {
  let service: NewSdRequestFormService;
  let employeeApi: EmployeeApi;
  let svtItemApi: SvtApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        FormBuilder,
        { provide: EmployeeApi, useClass: EmployeeApiStub },
        { provide: ServiceDeskApi, useClass: ServiceDeskApiStub },
        { provide: SvtApi, useClass: SvtApiStub }
      ]
    });

    service = TestBed.inject(NewSdRequestFormService);
    employeeApi = TestBed.inject(EmployeeApi);
    svtItemApi = TestBed.inject(SvtApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('"searchEmployee" input', () => {
    it('should disable "input" if "isUserInfoManually" enabled', () => {
      service.isUserInfoManually.setValue(true);

      expect(service.searchEmployee.disabled).toBeTrue();
    });

    it('should enable "input" if "isUserInfoManually" disabled', () => {
      service.isUserInfoManually.setValue(false);

      expect(service.searchEmployee.disabled).toBeFalse();
    });
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
        sdService = new IServiceBuilder().testBuild();
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

  describe('"employee" setter', () => {
    let employee: IBaseEmployee;

    beforeEach(() => {
      employee = new IBaseEmployeeBuilder().build();
      service.employee = employee;
    });

    it('should set "selectedEmployee" attribute', () => {
      expect(service.selectedEmployee).toEqual(employee);
    });

    it('should set form attributes from selected employee', () => {
      service.sdRequestForm$.subscribe(form => {
        const ssForm = form.get('source_snapshot') as FormGroup;

        expect(ssForm.get('id_tn').value).toEqual(employee.id);
        expect(ssForm.get('tn').value).toEqual(employee.personnelNo);
        expect(ssForm.get('fio').value).toEqual(employee.fullName);
        expect(ssForm.get('dept').value).toEqual(employee.departmentForAccounting);
        expect(ssForm.get('email').value).toEqual(employee.emailText);
        expect(ssForm.get('tel').value).toEqual(employee.phoneText);
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

  describe('"employeeGroups$" getter', () => {
    it('should return array of EmployeeGroup', (done) => {
      const employee = new IBaseEmployeeBuilder().build();
      const resultGroup: EmployeeGroup = {
        dept: employee.departmentForAccounting,
        employees: [employee]
      };
      spyOn(employeeApi, 'getEmployees').and.returnValue(of([employee]));

      service.employeeGroups$.subscribe(result => {
        expect(result).toEqual([resultGroup]);
        done();
      });

      service.searchEmployee.setValue('test');
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
      const svtItems = [new ISvtItemBuilder().short_item_model('First').testBuild(), new ISvtItemBuilder().short_item_model('Second').testBuild()];
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
      const svtItems = [new ISvtItemBuilder().short_item_model('First').testBuild(), new ISvtItemBuilder().short_item_model('Second').testBuild()];
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

  describe('#clearSearchEmployee', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOnProperty(service, 'employee', 'set');
      service.clearSearchEmployee();
    });

    it('should set empty array to "searchEmployee" attribute', () => {
      expect(service.searchEmployee.value).toEqual(null);
    });

    it('should call "employee" setter with empty object', () => {
      expect(spy).toHaveBeenCalledWith({ });
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

  describe('#addAttachments', () => {
    let file: File;
    let fileList: FileList;

    beforeEach(() => {
      file = new File([new Blob()], 'image.png');
      fileList = {
        0: file,
        length: 1,
        item: (index: number) => file
      };
    });

    it('should add FileGroup object to form', () => {
      const resultData = 'resultData';

      spyOn((service as any), 'convertToBase64').and.returnValue(of(resultData));
      service.addAttachments(fileList);

      service.sdRequestForm$.subscribe(form => {
        expect(form.get('attachments').value).toEqual([{ file, data: resultData }]);
      });
    });

    it('should not remove old files', () => {
      service.addAttachments(fileList);
      service.addAttachments(fileList);

      service.sdRequestForm$.subscribe(form => {
        expect(form.get('attachments').value.slice().length).toEqual(2);
      });
    });
  });

  describe('#removeAttachment', () => {
    let file: File;
    let fileList: FileList;

    beforeEach(() => {
      file = new File([new Blob()], 'image.png');
      fileList = {
        0: file,
        length: 1,
        item: (index: number) => file
      };
      service.addAttachments(fileList);
    });

    it('should remove file from form', () => {
      service.removeAttachment(file);

      service.sdRequestForm$.subscribe(form => {
        expect(form.get('attachments').value.slice().length).toEqual(0);
      });
    });
  });
});
