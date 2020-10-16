import * as moment from 'moment';

import { ActionTypes } from '@modules/claim/interfaces/history.interface';
import { IHistory } from '@modules/claim/interfaces/history.interface';

export class History {
  id: number;
  workId: number;
  userId: number;
  action: string;
  actionType: ActionTypes;
  createdAt: moment.Moment;

  constructor(history: IHistory) {
    this.id = history.id;
    this.workId = history.work_id;
    this.userId = history.user_id;
    this.action = history.action;
    this.actionType = history.action_type;
    this.createdAt = moment(history.created_at);
  }
}
