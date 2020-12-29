import * as faker from 'faker';

import { ModelBuilder } from '@shared/builders/model.builder';
import { IService } from '@modules/sd-request/interfaces/service.interface';

export class IServiceBuilder extends ModelBuilder<IService> {
  constructor() {
    super();

    this.model = {
      id: null,
      name: ''
    };
  }

  testBuild(): IService {
    this.model.id = this.model.id || faker.random.number();
    this.model.name = this.model.name || faker.random.word();

    return this.model;
  }

  id(id: number): IServiceBuilder {
    this.model.id = id;

    return this;
  }

  name(name: string): IServiceBuilder {
    this.model.name = name;

    return this;
  }
}
