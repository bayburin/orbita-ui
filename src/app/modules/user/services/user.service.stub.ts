import { of, Observable } from 'rxjs';

import { IUser } from '@modules/user/interfaces/user.interface';

export class UserServiceStub {
  getClaims(): Observable<IUser[]> { return of([]); }
}
