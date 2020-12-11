import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@shared/material.module';
import { WizzardUserInfoComponent } from './wizzard-user-info.component';
import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { NewSdRequestFormServiceStub } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service.stub';

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

  describe('#selectEmployee', () => {
    it('should call "employee" setter for NewSdRequestFormService service', () => {
      const employee = new IBaseEmployeeBuilder().build();
      const spy = spyOnProperty(formService, 'employee', 'set');

      component.selectEmployee(employee);

      expect(spy).toHaveBeenCalledWith(employee);
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
    it('should call empty "clearSearchEmployee" method for NewSdRequestFormService service', () => {
      const spy = spyOn(formService, 'clearSearchEmployee');

      component.clearSearchEmployee();

      expect(spy).toHaveBeenCalled();
    });
  });
});
