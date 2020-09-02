import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducers';

export const selectAuth = createFeatureSelector<fromAuth.State>(fromAuth.AUTH_FEATURE_KEY);

export const getIsAuthenticateed = createSelector(
  selectAuth,
  fromAuth.getIsAuthenticateed
);

export const getCurrentUser = createSelector(
  selectAuth,
  fromAuth.getCurrentUser
);

export const getAuthData = createSelector(
  selectAuth,
  fromAuth.getAuthData
);
