export enum ActionTypes {
  ACTION = 'action',
  COMMENT = 'comment',
  ADD_WORKER = 'add_worker',
  POSTPONE = 'postpone',
  CLOSE = 'close'
}

export interface IHistory {
  id: number;
  work_id: number;
  user_id: number;
  action: string;
  action_type: ActionTypes;
  created_at: string;
}
