import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

export class IBaseEmployeeBuilder {
  employee: IBaseEmployee;

  constructor() {
    this.employee = {
      lastName: 'Тестовый',
      firstName: 'Тест',
      middleName: 'Тестович',
      id: 1,
      personnelNo: 2,
      fullName: 'Тестовый Тест Тестович',
      departmentForAccounting: 123,
      emailText: 'test@mail.ru',
      phoneText: '12-34'
    } as IBaseEmployee;
  }

  build(): IBaseEmployee {
    return this.employee;
  }
}
