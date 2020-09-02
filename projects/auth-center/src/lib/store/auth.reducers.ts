import { createReducer, on, Action } from '@ngrx/store';

import { IAuthData } from './../interfaces/auth-data.interface';
import { CurrentUser } from '../models/current_user.model';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  isAuthenticated: boolean;
  currentUser: CurrentUser;
  authData: IAuthData;
}

export const initialState: State = {
  isAuthenticated: false,
  currentUser: null,
  authData: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.setIsAuthenticateed, (state, { isAuth }) => ({ ...state, isAuth })),
  on(AuthActions.setCurrentUser, (state, { currentUser }) => ({ ...state, currentUser })),
  on(AuthActions.setAuthData, (state, { authData }) => ({ ...state, authData }))
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const getIsAuthenticateed = (state: State) => state.isAuthenticated;
export const getCurrentUser = (state: State) => state.currentUser;
export const getAuthData = (state: State) => state.authData;
