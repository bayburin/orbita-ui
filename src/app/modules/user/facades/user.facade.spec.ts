import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import * as UserActions from '@modules/user/store/actions/user.actions';
import * as UserSelectors from '@modules/user/store/selectors/user.selectors';
import { USER_FEATURE_KEY, State } from '@modules/user/store/reducers/user.reducer';
import { UserFacade } from '@modules/user/facades/user.facade';
import { IUserBuilder } from '@modules/user/builders/i-user.builder';
import { IUserGroup } from '@modules/user/interfaces/user-group.interface';

describe('UserFacade', () => {
  let actions$: Observable<Action>;
  let facade: UserFacade;
  let store: MockStore<State>;
  const initialState = {
    [USER_FEATURE_KEY]: {
      ids: [],
      entities: { },
      selected: null
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ]
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(UserFacade);
  });

  it('should call "UserSelectors.getAll" selector for users$ attribute', () => {
    const users = [new IUserBuilder().testBuild()];

    store.overrideSelector(UserSelectors.getAll, users);

    facade.users$.subscribe(data => {
      expect(data).toEqual(users);
    });
  });

  describe('#loadUsers', () => {
    it('should dispatch "UserActions.loadAll" action', fakeAsync(() => {
      actions$ = of(UserActions.loadAll);
      const spy = spyOn(store, 'dispatch');

      facade.loadUsers();
      tick(100);
      expect(spy).toHaveBeenCalledWith(UserActions.loadAll());
    }));
  });

  describe('#createGroups', () => {
    it('should return users groups by dept', () => {
      const user = new IUserBuilder().testBuild();
      const resultGroup: IUserGroup = {
        group: user.group,
        users: [user]
      };

      store.overrideSelector(UserSelectors.getAll, [user]);

      expect(facade.createGroups([user])).toEqual([resultGroup]);
    });
  });
});
