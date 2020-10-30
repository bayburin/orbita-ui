import { EventTypeNames } from '@modules/claim/enums/event-type-names.enum';
import { IEventType } from '@modules/claim/interfaces/event-type.interface';

export class IEventTypeBuilder {
  eventType: IEventType;

  constructor() {
    this.eventType = {
      id: 1,
      name: EventTypeNames.WORKFLOW,
      description: 'test',
      icon: 'test-icon'
    };
  }

  build(): IEventType {
    return this.eventType;
  }

  id(id: number): IEventTypeBuilder {
    this.eventType.id = id;

    return this;
  }

  name(name: EventTypeNames): IEventTypeBuilder {
    this.eventType.name = name;

    return this;
  }

  description(description: string): IEventTypeBuilder {
    this.eventType.description = description;

    return this;
  }

  icon(icon: string): IEventTypeBuilder {
    this.eventType.icon = icon;

    return this;
  }
}
