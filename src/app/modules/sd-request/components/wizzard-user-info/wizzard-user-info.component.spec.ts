import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { MaterialModule } from '@shared/material.module';
import { WizzardUserInfoComponent } from './wizzard-user-info.component';
import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { NewSdRequestFormServiceStub } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service.stub';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IBaseEmployeeGroupBuilder } from '@modules/employee/builders/base-employee-group.builder';

describe('WizzardUserInfoComponent', () => {
  let component: WizzardUserInfoComponent;
  let fixture: ComponentFixture<WizzardUserInfoComponent>;
  let formService: NewSdRequestFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      declarations: [WizzardUserInfoComponent],
      providers: [{ provide: NewSdRequestFormService, useClass: NewSdRequestFormServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizzardUserInfoComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(NewSdRequestFormService);
    component.sourceSnapshotForm = (formService as any).sdRequestForm.getValue().get('source_snapshot');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On changes "searchEmployee" values', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(formService, 'searchEmployees');
    });

    it('should return array of loaded data', (done) => {
      const result = new IBaseEmployeeGroupBuilder().testBuild();
      spy.and.returnValue(of([result]));

      component.employeeGroups$.subscribe(data => {
        expect(data[0].dept).toEqual(result.dept);
        expect(data[0].employees).toEqual(result.employees);
        done();
      });

      component.searchEmployee.setValue('test value');
    });

    it('should return empty error if raised any error', (done) => {
      spy.and.callFake(() => throwError({ error: 'Error message' }));

      component.employeeGroups$.subscribe(data => {
        expect(data.length).toEqual(0);
        done();
      });

      component.searchEmployee.setValue('test value');
    });
  });

  describe('On changes "isManually" values', () => {
    it('should disable "searchEmployee" input if "isManually" enabled', () => {
      component.isManually.setValue(true);

      expect(component.searchEmployee.disabled).toBeTrue();
    });

    it('should enable "searchEmployee" input if "isManually" disabled', () => {
      component.isManually.setValue(false);

      expect(component.searchEmployee.disabled).toBeFalse();
    });
  });

  describe('#selectEmployee', () => {
    let employee: IBaseEmployee;

    beforeEach(() => {
      employee = new IBaseEmployeeBuilder().testBuild();
      component.selectEmployee(employee);
    });

    it('should set "selectedEmployee" attribute', () => {
      expect(component.selectedEmployee).toEqual(employee);
    });

    it('should set form attributes from selected employee', () => {
      const ssForm = component.sourceSnapshotForm;

      expect(ssForm.get('id_tn').value).toEqual(employee.id);
      expect(ssForm.get('tn').value).toEqual(employee.personnelNo);
      expect(ssForm.get('fio').value).toEqual(employee.fullName);
      expect(ssForm.get('dept').value).toEqual(employee.departmentForAccounting);
      expect(ssForm.get('email').value).toEqual(employee.emailText);
      expect(ssForm.get('tel').value).toEqual(employee.phoneText);
    });
  });

  describe('#displayEmployeeFn', () => {
    it('should return "fullName" attribute of employee', () => {
      const employee = new IBaseEmployeeBuilder().build();

      expect(component.displayEmployeeFn(employee)).toEqual(employee.fullName);
    });

    it('should return empty string if employee is null', () => {
      expect(component.displayEmployeeFn(null)).toEqual('');
    });
  });

  describe('#clearSearchEmployee', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(component, 'selectEmployee');
      component.clearSearchEmployee();
    });

    it('should set null to "searchEmployee" attribute', () => {
      expect(component.searchEmployee.value).toEqual(null);
    });

    it('should call "selectEmployee" method with empty object', () => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
