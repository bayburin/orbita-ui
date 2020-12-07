import { ModelBuilder } from '@shared/builders/model.builder';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

export class IBaseEmployeeBuilder extends ModelBuilder<IBaseEmployee> {
  constructor() {
    super();

    this.model = {
      lastName: '',
      firstName: '',
      middleName: '',
      id: null,
      personnelNo: null,
      fullName: '',
      departmentForAccounting: null,
      emailText: '',
      phoneText: ''
    } as IBaseEmployee;
  }

  testBuild(): IBaseEmployee {
    this.model.lastName = this.model.lastName || 'Тестовый';
    this.model.firstName = this.model.firstName || 'Тест';
    this.model.middleName = this.model.middleName || 'Тестович';
    this.model.id = this.model.id || 1;
    this.model.personnelNo = this.model.personnelNo || 2;
    this.model.fullName = this.model.fullName || 'Тестовый Тест Тестович';
    this.model.departmentForAccounting = this.model.departmentForAccounting || 123;
    this.model.emailText = this.model.emailText || 'test@mail.ru';
    this.model.phoneText = this.model.phoneText || '12-34';

    return this.model;
  }
}
