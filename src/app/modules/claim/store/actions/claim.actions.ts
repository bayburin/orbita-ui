import { createAction, props } from '@ngrx/store';

import { Claim } from '@modules/claim/models/claim/claim.model';

export const select  = createAction(
  '[Claim] Select',
  props<{ id: number }>()
);

export const loadAll = createAction('[Claim] Load All');

export const loadAllSuccess = createAction(
  '[Claim] Load All Success',
  props<{ claims: Claim[] }>()
);

export const loadAllFailure = createAction(
  '[Claim] Load All Failure',
  props<{ error: any }>()
);
