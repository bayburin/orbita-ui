import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromServices from './service.reducer';

export const selectServices = createFeatureSelector<fromServices.State>(fromServices.SERVICE_FEATURE_KEY);

export const getIds = createSelector(
  selectServices,
  fromServices.getIds
);

export const getEntities = createSelector(
  selectServices,
  fromServices.getEntities
);

export const getAll = createSelector(
  selectServices,
  fromServices.getAll
);

export const getError = createSelector(
  selectServices,
  fromServices.getError
);
