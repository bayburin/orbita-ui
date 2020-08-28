import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducers';

export const selectClaims = createFeatureSelector<fromClaims.State>('claims');

export const getIds = createSelector(
  selectClaims,
  fromClaims.getIds
);

export const getClaims = createSelector(
  selectClaims,
  fromClaims.getClaims
);

export const setSelected = createSelector(
  selectClaims,
  fromClaims.getSelected
);

export const getAllClaims = createSelector(
  getIds,
  getClaims,
  (ids, claims) => ids.map((id: number) => claims[id])
);
