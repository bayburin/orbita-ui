import { ModelBuilder } from '@shared/builders/model.builder';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';

export class IBaseEmployeeGroupBuilder extends ModelBuilder<IBaseEmployeeGroup> {
  constructor() {
    super();

    this.model = {
      dept: null,
      employees: []
    };
  }

  testBuild(): IBaseEmployeeGroup {
    const employee = new IBaseEmployeeBuilder().build();

    this.model.dept = this.model.dept || employee.departmentForAccounting;
    this.model.employees = this.model.employees.length > 0 ? this.model.employees : [employee];

    return this.model;
  }

  dept(dept: number): IBaseEmployeeGroupBuilder {
    this.model.dept = dept;

    return this;
  }

  employees(employees: IBaseEmployee[]): IBaseEmployeeGroupBuilder {
    this.model.employees = employees;

    return this;
  }
}
