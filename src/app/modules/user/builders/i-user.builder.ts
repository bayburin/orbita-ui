import * as faker from 'faker';

import { ModelBuilder } from '@shared/builders/model.builder';
import { IUser } from '@modules/user/interfaces/user.interface';

export class IUserBuilder extends ModelBuilder<IUser> {
  constructor() {
    super();

    this.model = {
      id: null,
      role_id: null,
      group_id: null,
      tn: null,
      id_tn: null,
      fio: '',
      work_tel: '',
      mobile_tel: '',
      email: '',
      is_vacation: false
    };
  }

  testBuild(): IUser {
    this.model.id = this.model.id || 1;
    this.model.role_id = this.model.role_id || faker.random.number();
    this.model.group_id = this.model.group_id || faker.random.number();
    this.model.tn = this.model.tn || faker.random.number();
    this.model.id_tn = this.model.id_tn || faker.random.number();
    this.model.fio = this.model.fio || faker.name.findName();
    this.model.work_tel = this.model.work_tel || '12-34';
    this.model.mobile_tel = this.model.mobile_tel || '1-222-333-44-55';
    this.model.email = this.model.email || faker.internet.email();

    return this.model;
  }

  id(id: number): IUserBuilder {
    this.model.id = id;

    return this;
  }
}
