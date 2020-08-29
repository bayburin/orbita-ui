import { createReducer, on, Action } from '@ngrx/store';

import { Claim } from '@modules/claim/models/claim/claim.model';
import * as ClaimActions from '@modules/claim/store/actions/claim.actions';

export const CLAIM_FEATURE_KEY = 'claims';

export interface State {
  ids: number[];
  claims: { [id: number]: Claim };
  selected: number;
  loading: boolean;
  loaded: boolean;
  error?: string | null;
}

export const initialState: State = {
  ids: [],
  claims: null,
  selected: null,
  loading: false,
  loaded: false,
};

const claimReducer = createReducer(
  initialState,
  on(ClaimActions.select, (state, { id }) => ({ ...state, selected: id })),
  on(ClaimActions.loadAll, state => ({ ...state, loading: true, loaded: false, error: null })),
  on(ClaimActions.loadAllSuccess, (state, { claims }) => ({
    ...state,
    claims: claims.reduce((map: any, obj: Claim) => {
      map[obj.id] = obj;

      return map;
    }, {}),
    ids: claims.map((claim: Claim) => claim.id),
    loading: false,
    loaded: true
  })),
  on(ClaimActions.loadAllFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action): State {
  return claimReducer(state, action);
}

export const getIds = (state: State) => state.ids;
export const getClaims = (state: State) => state.claims;
export const getSelected = (state: State) => state.selected;
