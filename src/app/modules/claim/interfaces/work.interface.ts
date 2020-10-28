import { IHistory } from './history.interface';
import { IGroup } from './group.interface';

export interface IWork {
  id: number;
  claim_id: number;
  title: string;
  status: string;
  attrs: any;
  histories: IHistory[];
  group: IGroup;
}
