import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { MaterialModule } from '@shared/material.module';
import { WizzardUserInfoComponent, EmployeeGroup } from './wizzard-user-info.component';
import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { EmployeeFacade } from '@modules/employee/facades/employee.facade';
import { EmployeeFacadeStub } from '@modules/employee/facades/employee.facade.stub';

describe('WizzardUserInfoComponent', () => {
  let component: WizzardUserInfoComponent;
  let fixture: ComponentFixture<WizzardUserInfoComponent>;
  let employeeFacade: EmployeeFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      declarations: [WizzardUserInfoComponent],
      providers: [{ provide: EmployeeFacade, useClass: EmployeeFacadeStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizzardUserInfoComponent);
    component = fixture.componentInstance;
    employeeFacade = TestBed.inject(EmployeeFacade);
    const formBuilder = TestBed.inject(FormBuilder);
    component.sourceSnapshotForm = formBuilder.group({
      id_tn: [''],
      tn: [''],
      fio: [''],
      dept: [''],
      email: [''],
      tel: [''],
      mobile: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    describe('"searchEmployee" input', () => {
      it('should disable "input" if "isManually" enabled', () => {
        component.isManually.setValue(true);
        fixture.detectChanges();

        expect(component.searchEmployee.disabled).toBeTrue();
      });

      it('should enable "input" if "isManually" disabled', () => {
        component.isManually.setValue(false);
        fixture.detectChanges();

        expect(component.searchEmployee.disabled).toBeFalse();
      });

      it('should return array of EmployeeGroup', (done) => {
        const employee = new IBaseEmployeeBuilder().build();
        const resultGroup: EmployeeGroup = {
          dept: employee.departmentForAccounting,
          employees: [employee]
        };
        spyOn(employeeFacade, 'loadEmployees').and.returnValue(of([employee]));

        component.employeeGroups$.subscribe(result => {
          expect(result).toEqual([resultGroup]);
          done();
        });

        component.searchEmployee.setValue('test');
      });

      describe('when EmployeeFacade raise error', () => {
        beforeEach(() => {
          spyOn(employeeFacade, 'loadEmployees').and.callFake(() => throwError(new Error('Server Error')));
        });

        it('should return empty arrray', (done) => {
          component.employeeGroups$.subscribe(result => {
            expect(result).toEqual([]);
            done();
          });

          component.searchEmployee.setValue('test');
        });

        it('should add error to "searchEmployee" FormComtrol', (done) => {
          component.employeeGroups$.subscribe(() => {
            expect(component.searchEmployee.hasError('serverError')).toBeTrue();
            done();
          });

          component.searchEmployee.setValue('test');
        });
      });
    });
  });

  describe('#employeeSelected', () => {
    let employee: IBaseEmployee;

    beforeEach(() => {
      employee = new IBaseEmployeeBuilder().build();
      component.employeeSelected(employee);
    });

    it('should set "selectedEmployee" attribute', () => {
      expect(component.selectedEmployee).toEqual(employee);
    });

    it('should set form attributes from selected employee', () => {
      expect(component.sourceSnapshotFormControl.id_tn.value).toEqual(employee.id);
      expect(component.tn).toEqual(employee.personnelNo);
      expect(component.fio).toEqual(employee.fullName);
      expect(component.dept).toEqual(employee.departmentForAccounting);
      expect(component.email).toEqual(employee.emailText);
      expect(component.tel).toEqual(employee.phoneText);
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

  describe('#clearEmployee', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(component, 'employeeSelected');
      component.clearEmployee();
    });

    it('should set empty array to "searchEmployee" attribute', () => {
      expect(component.searchEmployee.value).toEqual(null);
    });

    it('should call "employeeSelected" method with empty object', () => {
      expect(spy).toHaveBeenCalledWith({ });
    });
  });
});
