import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromUsers from '@modules/user/store/reducers/user.reducer';
import * as UserActions from '@modules/user/store/actions/user.actions';
import * as UserSelectors from '@modules/user/store/selectors/user.selectors';
import { IUser } from '@modules/user/interfaces/user.interface';
import { IUserGroup } from '@modules/user/interfaces/user-group.interface';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  users$: Observable<IUser[]>;

  constructor(private store: Store<fromUsers.State>) {
    this.users$ = store.select(UserSelectors.getAll);
  }

  /**
   * Загружает список пользователей.
   */
  loadUsers(): void {
    this.store.dispatch(UserActions.loadAll());
  }

  /**
   * Возвращает массив пользователей, сгруппированный по отделам.
   *
   * @param users - массив пользователей.
   */
  createGroups(users: IUser[]): IUserGroup[] {
    return users.reduce((acc, user) => {
      const accEl = acc.find((el: IUserGroup) => el.group && el.group.id === user.group_id);

      if (accEl) {
        accEl.users.push(user);
      } else {
        const res: IUserGroup = {
          group: user.group,
          users: [user]
        };

        acc.push(res);
      }

      return acc;
    }, []);
  }
}
