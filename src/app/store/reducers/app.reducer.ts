import { ActionReducerMap } from '@ngrx/store';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducer';
import { ClaimEffects } from '@modules/claim/store/effects/claim.effects';

export interface IAppState {
  claims: fromClaims.State;
}

export const initialAppState: IAppState = {
  claims: fromClaims.initialState
};

export const appReducers: ActionReducerMap<IAppState> = {
  claims: fromClaims.reducer
};

export const effects: any[] = [
  ClaimEffects
];
