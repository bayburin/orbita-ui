import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IUser } from '@modules/user/interfaces/user.interface';
import * as UserActions from '@modules/user/store/actions/user.actions';

export const USER_FEATURE_KEY = 'user';

export interface State extends EntityState<IUser> {
  selected: number;
  error?: string | null;
}

export const adapter: EntityAdapter<IUser> = createEntityAdapter();

export const initialState: State = adapter.getInitialState({ selected: null });

const userReducer = createReducer(
  initialState,
  on(UserActions.select, (state, { id }) => ({ ...state, selected: id })),
  on(UserActions.loadAll, state => ({ ...state, error: null })),
  on(UserActions.loadAllSuccess, (state, { users }) => adapter.upsertMany(users, state)),
  on(UserActions.loadAllFailure, (state, { error }) => ({ ...state, error }))
);


export function reducer(state: State | undefined, action: Action): State {
  return userReducer(state, action);
}
