import { ClaimStatuses } from '@modules/claim/models/claim/claim.model';
import { ClaimPriorities } from '@modules/claim/models/claim/claim.model';
import { IRuntime } from './runtime.interface';
import { IWork } from './work.interface';

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
  works?: IWork[];
}
