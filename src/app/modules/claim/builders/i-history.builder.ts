import { IHistory } from '@modules/claim/interfaces/history.interface';
import { HistoryActionTypes } from '@modules/claim/enums/history-action-type.enum';

export class IHistoryBuilder {
  private history: IHistory;

  constructor() {
    this.history = {
      id: 1,
      work_id: 1,
      user_id: 1,
      action: 'Test action',
      action_type: HistoryActionTypes.ACTION,
      created_at: '04-05-2020 18:34',
    };
  }

  build(): IHistory {
    return this.history;
  }

  id(id: number): IHistoryBuilder {
    this.history.id = id;

    return this;
  }

  work_id(workId: number): IHistoryBuilder {
    this.history.work_id = workId;

    return this;
  }

  user_id(userId: number): IHistoryBuilder {
    this.history.user_id = userId;

    return this;
  }

  action(action: string): IHistoryBuilder {
    this.history.action = action;

    return this;
  }

  action_type(actionType: HistoryActionTypes): IHistoryBuilder {
    this.history.action_type = actionType;

    return this;
  }

  created_at(createdAt: string): IHistoryBuilder {
    this.history.created_at = createdAt;

    return this;
  }
}
