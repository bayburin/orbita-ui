import { ActionReducerMap } from '@ngrx/store';

import * as fromClaims from '@modules/claim/store/reducers/claim.reducer';
import { ClaimEffects } from '@modules/claim/store/effects/claim.effects';

// FIXME: Разобраться, нужно ли здесь подключать Store для модулей или подключать их как forFeature в модулях
export interface IAppState {
  [fromClaims.CLAIM_FEATURE_KEY]: fromClaims.State;
}

export const initialAppState: IAppState = {
  [fromClaims.CLAIM_FEATURE_KEY]: fromClaims.initialState
};

export const appReducers: ActionReducerMap<IAppState> = {
  [fromClaims.CLAIM_FEATURE_KEY]: fromClaims.reducer
};

export const effects: any[] = [
  ClaimEffects
];
