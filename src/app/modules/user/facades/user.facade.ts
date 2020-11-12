import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromUsers from '@modules/user/store/reducers/user.reducer';
import * as UserActions from '@modules/user/store/actions/user.actions';
import * as UserSelectors from '@modules/user/store/selectors/user.selectors';
import { IUser } from '@modules/user/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  users$: Observable<IUser[]>;

  constructor(private store: Store<fromUsers.State>) {
    this.users$ = store.select(UserSelectors.getAll);
  }

  /**
   * Загрузить список пользователей.
   */
  loadUsers(): void {
    this.store.dispatch(UserActions.loadAll());
  }
}
