import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromUsers from '@modules/user/store/reducers/user.reducer';

export const selectClaims = createFeatureSelector<fromUsers.State>(fromUsers.USER_FEATURE_KEY);

export const getIds = createSelector(
  selectClaims,
  fromUsers.getIds
);

export const getEntities = createSelector(
  selectClaims,
  fromUsers.getEntities
);

export const getAll = createSelector(
  selectClaims,
  fromUsers.getAll
);

export const getTotalCount = createSelector(
  selectClaims,
  fromUsers.getTotalCount
);

export const getSelected = createSelector(
  selectClaims,
  fromUsers.getSelected
);
