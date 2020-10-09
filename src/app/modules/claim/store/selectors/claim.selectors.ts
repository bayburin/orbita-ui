import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducer';

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

export const getEntity = createSelector(
  getSelected,
  getEntities,
  (selectedId, entities) => {
    return {
      ...entities[selectedId]
    };
  }
);
