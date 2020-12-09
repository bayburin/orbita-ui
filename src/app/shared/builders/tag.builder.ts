import * as faker from 'faker';

import { ITag } from '@shared/interfaces/tag.interface';
import { ModelBuilder } from '@shared/builders/model.builder';

export class ITagBuilder extends ModelBuilder<ITag> {
  constructor() {
    super();

    this.model = {
      id: null,
      name: ''
    };
  }

  testBuild(): ITag {
    this.model.id = this.model.id || faker.random.number();
    this.model.name = this.model.name || faker.random.word();

    return this.model;
  }
}