import { ActionReducerMap } from '@ngrx/store';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducers';

export interface IAppState {
  claims: fromClaims.State;
}

export const initialAppState: IAppState = {
  claims: fromClaims.initialState
};

export const appReducers: ActionReducerMap<IAppState> = {
  claims: fromClaims.reducer
};
