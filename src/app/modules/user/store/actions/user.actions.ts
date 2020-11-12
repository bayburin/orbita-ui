import { createAction, props } from '@ngrx/store';

import { IUser } from '@modules/user/interfaces/user.interface';

export const select = createAction(
  '[User] Select',
  props<{ id: number }>()
);

export const loadAll = createAction('[User] Load All');

export const loadAllSuccess = createAction(
  '[User] Load All Success',
  props<{ users: IUser[] }>()
);

export const loadAllFailure = createAction(
  '[User] Load All Failure',
  props<{ error: any }>()
);
