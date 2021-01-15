import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromEmployees from './employee.reducer';

export const selectUsers = createFeatureSelector<fromEmployees.State>(fromEmployees.EMPLOYEE_FEATURE_KEY);

export const getIds = createSelector(
  selectUsers,
  fromEmployees.getIds
);

export const getEntities = createSelector(
  selectUsers,
  fromEmployees.getEntities
);

export const getAll = createSelector(
  selectUsers,
  fromEmployees.getAll
);
