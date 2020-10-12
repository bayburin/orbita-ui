import { createAction, props } from '@ngrx/store';

import { IClaim } from '@modules/claim/interfaces/claim.interface';

export const select  = createAction(
  '[Claim] Select',
  props<{ id: number }>()
);

export const loadAll = createAction('[Claim] Load All');

export const loadAllSuccess = createAction(
  '[Claim] Load All Success',
  props<{ claims: IClaim[] }>()
);

export const loadAllFailure = createAction(
  '[Claim] Load All Failure',
  props<{ error: any }>()
);
