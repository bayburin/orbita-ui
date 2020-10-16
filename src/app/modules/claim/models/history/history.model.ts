import * as moment from 'moment';

import { HistoryActionTypes } from '@modules/claim/enums/history-action-type.enum';
import { IHistory } from '@modules/claim/interfaces/history.interface';

export class History {
  id: number;
  workId: number;
  userId: number;
  action: string;
  actionType: HistoryActionTypes;
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
