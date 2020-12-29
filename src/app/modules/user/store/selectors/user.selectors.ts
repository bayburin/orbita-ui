import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromUsers from '@modules/user/store/reducers/user.reducer';

export const selectUsers = createFeatureSelector<fromUsers.State>(fromUsers.USER_FEATURE_KEY);

export const getIds = createSelector(
  selectUsers,
  fromUsers.getIds
);

export const getEntities = createSelector(
  selectUsers,
  fromUsers.getEntities
);

export const getAll = createSelector(
  selectUsers,
  fromUsers.getAll
);

export const getTotalCount = createSelector(
  selectUsers,
  fromUsers.getTotalCount
);

export const getSelected = createSelector(
  selectUsers,
  fromUsers.getSelected
);
