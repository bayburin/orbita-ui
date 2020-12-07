import * as faker from 'faker';

import { ModelBuilder } from '@shared/builders/model.builder';
import { IUserWork } from '@modules/claim/interfaces/user-work.interface';

export class IUserWorkBuilder extends ModelBuilder<IUserWork> {
  constructor() {
    super();

    this.model = {
      id: null,
      user_id: null,
      work_id: null
    };
  }

  testBuild(): IUserWork {
    this.model.id = this.model.id || faker.random.number();
    this.model.user_id = this.model.user_id || 1;
    this.model.work_id = this.model.work_id || faker.random.number();

    return this.model;
  }
}
