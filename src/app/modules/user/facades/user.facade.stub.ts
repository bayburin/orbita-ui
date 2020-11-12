import { Observable } from 'rxjs';

import { IUser } from '@modules/user/interfaces/user.interface';

export class ClaimFacadeStub {
  users$: Observable<IUser[]> = new Observable();

  loadUsers(): void { }
}
