import { ActionReducerMap, createSelector, createFeatureSelector, ActionReducer } from '@ngrx/store';

import { IClaimState } from '@modules/claim/store/state/claim.state';

export const selectClaims = createFeatureSelector<IClaimState>('claims');

export const getIds = createSelector(
  selectClaims,
  (state: IClaimState) => state.ids
);

export const getClaims = createSelector(
  selectClaims,
  (state: IClaimState) => state.claims
);

export const setSelected = createSelector(
  selectClaims,
  (state: IClaimState) => state.selected
);

export const getAllClaims = createSelector(
  getIds,
  getClaims,
  (ids, claims) => ids.map(id => claims[id])
);
