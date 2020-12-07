import { BehaviorSubject, Observable } from 'rxjs';

import { IUser } from '@modules/user/interfaces/user.interface';
import { IUserBuilder } from '@modules/user/builders/i-user.builder';

export class UserFacadeStub {
  users$: Observable<IUser[]> = new BehaviorSubject([new IUserBuilder().testBuild()]);

  loadUsers(): void { }
}
