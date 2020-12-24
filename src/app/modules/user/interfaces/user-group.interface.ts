import { IGroup } from './group.interface';
import { IUser } from './user.interface';

export interface IUserGroup {
  group: IGroup;
  users: IUser[];
}
