import { createAction, props } from '@ngrx/store';

import { CurrentUser } from './../models/current_user.model';
import { IAuthData } from './../interfaces/auth-data.interface';

export const setIsAuthenticateed = createAction(
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
