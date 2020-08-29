import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducer';

export const selectClaims = createFeatureSelector<fromClaims.State>(fromClaims.CLAIM_FEATURE_KEY);

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

export const getClaimsArray = createSelector(
  getIds,
  getClaims,
  (ids, claims) => ids.map((id: number) => claims[id])
);
