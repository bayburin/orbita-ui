import * as faker from 'faker';

import { ModelBuilder } from '@shared/builders/model.builder';
import { IGroup } from '@modules/user/interfaces/group.interface';

export class IGroupBuilder extends ModelBuilder<IGroup> {
  constructor() {
    super();

    this.model = {
      id: null,
      name: '',
      description: ''
    };
  }

  testBuild(): IGroup {
    this.model.id = this.model.id || faker.random.number();
    this.model.name = this.model.name || faker.random.word();
    this.model.description = this.model.description || faker.random.word();

    return this.model;
  }

  id(id: number): IGroupBuilder {
    this.model.id = id;

    return this;
  }

  name(name: string): IGroupBuilder {
    this.model.name = name;

    return this;
  }

  description(description: string): IGroupBuilder {
    this.model.description = description;

    return this;
  }
}
