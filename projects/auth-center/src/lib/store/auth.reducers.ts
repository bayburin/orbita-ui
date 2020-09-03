import { createReducer, on, Action } from '@ngrx/store';

import { IAuthData } from './../interfaces/auth-data.interface';
import { CurrentUser } from '../models/current_user.model';
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  isAuthenticated: boolean;
  currentUser: CurrentUser;
  authData: IAuthData;
  error?: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  currentUser: null,
  authData: null
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.setIsAuthenticated, (state, { isAuth }) => ({ ...state, isAuth })),
  on(AuthActions.setCurrentUser, (state, { currentUser }) => ({ ...state, currentUser })),
  on(AuthActions.setAuthData, (state, { authData }) => ({ ...state, authData })),
  on(AuthActions.loadAuthData, state => ({ ...state, error: null })),
  on(AuthActions.loadAuthDataSuccess, (state, { authData }) => ({ ...state, authData })),
  on(AuthActions.loadAuthDataFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action): State {
  return authReducer(state, action);
}

export const getIsAuthenticateed = (state: State) => state.isAuthenticated;
export const getCurrentUser = (state: State) => state.currentUser;
export const getAuthData = (state: State) => state.authData;
