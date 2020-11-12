import { IHistory } from './history.interface';
import { IGroup } from '@modules/user/interfaces/group.interface';
import { IUserWork } from './user-work.interface';

export interface IWork {
  id: number;
  claim_id: number;
  title: string;
  status: string;
  attrs: any;
  histories: IHistory[];
  group: IGroup;
  workers: IUserWork[];
}
