import * as moment from 'moment';

import { IHistory } from '@modules/claim/interfaces/history.interface';
import { IEventType } from '@modules/claim/interfaces/event-type.interface';

export class History {
  id: number;
  workId: number;
  userId: number;
  eventTypeId: number;
  action: string;
  createdAt: moment.Moment;
  eventType: IEventType;

  constructor(history: IHistory) {
    this.id = history.id;
    this.workId = history.work_id;
    this.userId = history.user_id;
    this.action = history.action;
    this.eventTypeId = history.event_type_id;
    this.createdAt = moment(history.created_at);
    this.eventType = history.event_type;

    console.log(this);
  }
}
