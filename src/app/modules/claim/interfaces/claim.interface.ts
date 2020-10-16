import { IRuntime } from './runtime.interface';
import { IWork } from './work.interface';

export enum ClaimStatuses {
  OPENED = 'opened', // Открыта
  AT_WORK = 'at_work', // В работе
  CANCELED = 'canceled', // Отменена
  APPROVED = 'approved', // Согласована
  REOPENED = 'reopened' // Переоткрыта
}

export enum ClaimPriorities {
  DEFAULT = 'default',
  LOW = 'low',
  HIGH = 'high'
}

export interface IClaim {
  id: number;
  service_id: number;
  claim_template_id: number;
  service_name: string;
  claim_template_name: string;
  status: ClaimStatuses;
  priority: ClaimPriorities;
  claim_user: any; // TODO: Заменить на IUser
  runtime: IRuntime;
  attrs: any;
  rating: number;
  works: IWork[];
}
