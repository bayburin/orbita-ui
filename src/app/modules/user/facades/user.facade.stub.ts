import { BehaviorSubject, Observable } from 'rxjs';

import { IUser } from '@modules/user/interfaces/user.interface';
import { IUserBuilder } from '@modules/user/builders/i-user.builder';
import { IUserGroup } from '@modules/user/interfaces/user-group.interface';

export class UserFacadeStub {
  users$: Observable<IUser[]> = new BehaviorSubject([new IUserBuilder().testBuild()]).asObservable();

  loadUsers(): void { }
  createGroups(users: IUser[]): IUserGroup[] { return []; }
}
