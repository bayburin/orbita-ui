import { ITimeInfo } from './time-info.interface';

export interface IClaim {
  id: number;
  service_id: number;
  claim_template_id: number;
  service_name: string;
  claim_template_name: string;
  status: string;
  priority: string;
  // TODO: Заменить на IUser
  claim_user: any;
  time_info: ITimeInfo;
  attrs: any;
  rating: number;
}
