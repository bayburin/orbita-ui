import { createAction, props } from '@ngrx/store';

import { CurrentUser } from './../models/current_user.model';
import { IAuthData } from './../interfaces/auth-data.interface';

export const setIsAuthenticated = createAction(
  '[Auth] Set Is Authenticateed',
  props<{ isAuth: boolean }>()
);

export const setCurrentUser = createAction(
  '[Auth] Set Current User',
  props<{ currentUser: CurrentUser }>()
);

export const setAuthData = createAction(
  '[Auth] Set Auth Data',
  props<{ authData: IAuthData }>()
);

export const loadAuthData = createAction('[Auth] Load Auth Data');

export const loadAuthDataSuccess = createAction(
  '[Auth] Load Auth Data Success',
  props<{ authData: IAuthData }>()
);

export const loadAuthDataFailure = createAction(
  '[Auth] Load Auth Data Failure',
  props<{ error: any }>()
);
