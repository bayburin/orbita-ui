import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducer';
import { ClaimFactory } from '@modules/claim/factories/claim/claim.factory';

export const selectClaims = createFeatureSelector<fromClaims.State>(fromClaims.CLAIM_FEATURE_KEY);

export const getIds = createSelector(
  selectClaims,
  fromClaims.getIds
);

export const getEntities = createSelector(
  selectClaims,
  fromClaims.getEntities
);

export const getAll = createSelector(
  selectClaims,
  fromClaims.getAll
);

export const getTotalCount = createSelector(
  selectClaims,
  fromClaims.getTotalCount
);

export const getSelected = createSelector(
  selectClaims,
  fromClaims.getSelected
);

export const getEntityClaim = createSelector(
  getSelected,
  getEntities,
  (selectedId, entities) => {
    return ClaimFactory.create({ ...entities[selectedId] });
  }
);

export const getAllClaims = createSelector(
  getAll,
  (iClaims) => {
    return iClaims.map(iClaim => ClaimFactory.create({ ...iClaim }));
  }
);

