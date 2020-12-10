import * as faker from 'faker';

import { ModelBuilder } from '@shared/builders/model.builder';
import { ISvtType } from '@modules/sd-request/interfaces/svt-type.interface';

export class ISvtTypeBuilder extends ModelBuilder<ISvtType> {
  constructor() {
    super();

    this.model = {
      type_id: null,
      name: null,
      short_description: '',
      long_description: ''
    }
  }

  testBuild(): ISvtType {
    this.model.type_id = this.model.type_id || faker.random.number();
    this.model.name = this.model.name || faker.random.word();
    this.model.short_description = this.model.short_description || faker.random.word();
    this.model.long_description = this.model.long_description || faker.random.word();

    return this.model;
  }
}