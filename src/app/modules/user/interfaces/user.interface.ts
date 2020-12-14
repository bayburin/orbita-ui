import { IGroup } from './group.interface';
import { IRole } from './role.interface';

export interface IUser {
  id: number;
  role_id: number;
  group_id: number;
  tn: number;
  id_tn: number;
  fio: string;
  work_tel: string;
  mobile_tel: string;
  email: string;
  is_vacation: boolean;
  group: IGroup;
  role: IRole;
}
