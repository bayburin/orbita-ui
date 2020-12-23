import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { MaterialModule } from '@shared/material.module';
import { WizzardEmployeeInfoComponent } from './wizzard-employee-info.component';
import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { NewSdRequestFormServiceStub } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service.stub';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IBaseEmployeeGroupBuilder } from '@modules/employee/builders/base-employee-group.builder';

describe('WizzardEmployeeInfoComponent', () => {
  let component: WizzardEmployeeInfoComponent;
  let fixture: ComponentFixture<WizzardEmployeeInfoComponent>;
  let formService: NewSdRequestFormService;
  let form: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      declarations: [WizzardEmployeeInfoComponent],
      providers: [{ provide: NewSdRequestFormService, useClass: NewSdRequestFormServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    form = new FormGroup({
      id_tn: new FormControl(null),
      tn: new FormControl(null),
      fio: new FormControl(''),
      dept: new FormControl(null),
      email: new FormControl(''),
      tel: new FormControl(''),
      mobile: new FormControl('')
    });
    fixture = TestBed.createComponent(WizzardEmployeeInfoComponent);
    component = fixture.componentInstance;
    component.sourceSnapshotForm = form;
    formService = TestBed.inject(NewSdRequestFormService);
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
      expect(form.get('id_tn').value).toEqual(employee.id);
      expect(form.get('tn').value).toEqual(employee.personnelNo);
      expect(form.get('fio').value).toEqual(employee.fullName);
      expect(form.get('dept').value).toEqual(employee.departmentForAccounting);
      expect(form.get('email').value).toEqual(employee.emailText);
      expect(form.get('tel').value).toEqual(employee.phoneText);
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
