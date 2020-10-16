import { HistoryActionTypes } from '@modules/claim/enums/history-action-type.enum';

export interface IHistory {
  id: number;
  work_id: number;
  user_id: number;
  action: string;
  action_type: HistoryActionTypes;
  created_at: string;
}
