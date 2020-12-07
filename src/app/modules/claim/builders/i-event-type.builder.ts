import * as faker from 'faker';

import { ModelBuilder } from '@shared/builders/model.builder';
import { EventTypeNames } from '@modules/claim/enums/event-type-names.enum';
import { IEventType } from '@modules/claim/interfaces/event-type.interface';

export class IEventTypeBuilder extends ModelBuilder<IEventType> {
  constructor() {
    super();

    this.model = {
      id: null,
      name: EventTypeNames.WORKFLOW,
      description: '',
      icon: ''
    };
  }

  testBuild(): IEventType {
    this.model.id = this.model.id || faker.random.number();
    this.model.name = this.model.name || faker.random.word();
    this.model.description = this.model.description || faker.random.word();

    return this.model;
  }

  id(id: number): IEventTypeBuilder {
    this.model.id = id;

    return this;
  }

  name(name: EventTypeNames): IEventTypeBuilder {
    this.model.name = name;

    return this;
  }

  description(description: string): IEventTypeBuilder {
    this.model.description = description;

    return this;
  }

  icon(icon: string): IEventTypeBuilder {
    this.model.icon = icon;

    return this;
  }
}
