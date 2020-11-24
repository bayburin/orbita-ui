import { IRuntime } from './runtime.interface';
import { IWork } from './work.interface';
import { ClaimStatuses } from '@modules/claim/enums/claim-statuses.enum';
import { ClaimPriorities } from '@modules/claim/enums/claim-priorities.enum';
import { ClaimTypes } from '../enums/claim-types.enum';

export interface IClaim {
  id: number;
  type: ClaimTypes;
  service_id: number;
  app_template_id: number;
  service_name: string;
  app_template_name: string;
  status: ClaimStatuses;
  priority: ClaimPriorities;
  claim_user: any; // TODO: Заменить на IUser
  runtime: IRuntime;
  attrs: any;
  rating: number;
  works: IWork[];
}
