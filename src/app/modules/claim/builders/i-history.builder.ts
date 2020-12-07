import * as moment from 'moment';
import * as faker from 'faker';

import { ModelBuilder } from '@shared/builders/model.builder';
import { IHistory } from '@modules/claim/interfaces/history.interface';
import { IEventTypeBuilder } from './i-event-type.builder';

export class IHistoryBuilder extends ModelBuilder<IHistory> {
  constructor() {
    super();

    this.model = {
      id: null,
      work_id: null,
      user_id: null,
      event_type_id: null,
      event_type: new IEventTypeBuilder().build(),
      action: '',
      created_at: '',
    };
  }

  testBuild(): IHistory {
    this.model.id = this.model.id || faker.random.number();
    this.model.work_id = this.model.work_id || faker.random.number();
    this.model.user_id = this.model.user_id || faker.random.number();
    this.model.event_type_id = this.model.event_type_id || faker.random.number();
    this.model.event_type = this.model.event_type.id ? this.model.event_type : new IEventTypeBuilder().testBuild();
    this.model.created_at = this.model.created_at || moment().format();

    return this.model;
  }

  id(id: number): IHistoryBuilder {
    this.model.id = id;

    return this;
  }

  work_id(workId: number): IHistoryBuilder {
    this.model.work_id = workId;

    return this;
  }

  user_id(userId: number): IHistoryBuilder {
    this.model.user_id = userId;

    return this;
  }

  event_type_id(eventTypeId: number): IHistoryBuilder {
    this.model.event_type_id = eventTypeId;

    return this;
  }

  action(action: string): IHistoryBuilder {
    this.model.action = action;

    return this;
  }

  created_at(createdAt: string): IHistoryBuilder {
    this.model.created_at = createdAt;

    return this;
  }
}
