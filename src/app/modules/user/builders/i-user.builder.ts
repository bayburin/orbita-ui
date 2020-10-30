import { IUser } from '@modules/user/interfaces/user.interface';

export class IUserBuilder {
  private user: IUser;

  constructor() {
    this.user = {
      id: 1,
      role_id: 2,
      group_id: 3,
      tn: 123,
      id_tn: 456,
      fio: 'Test fio',
      work_tel: '12-34',
      mobile_tel: '1-222-333-44-55',
      email: 'test@test.ru',
      is_vacation: false
    };
  }

  build(): IUser {
    return this.user;
  }

  id(id: number): IUserBuilder {
    this.user.id = id;

    return this;
  }
}
