import { IEventType } from '@modules/claim/interfaces/event-type.interface';

export interface IHistory {
  id: number;
  work_id: number;
  user_id: number;
  event_type_id: number;
  event_type: IEventType;
  action: string;
  created_at: string;
}
