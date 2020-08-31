import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Claim } from '@modules/claim/models/claim/claim.model';
import * as ClaimActions from '@modules/claim/store/actions/claim.actions';

export const CLAIM_FEATURE_KEY = 'claim';

export interface State extends EntityState<Claim> {
  selected: number;
  error?: string | null;
}

export const initialState: State = {
  ids: [],
  entities: null,
  selected: null
};

export const adapter: EntityAdapter<Claim> = createEntityAdapter();

const claimReducer = createReducer(
  initialState,
  on(ClaimActions.select, (state, { id }) => ({ ...state, selected: id })),
  on(ClaimActions.loadAll, state => ({ ...state, error: null })),
  on(ClaimActions.loadAllSuccess, (state, { claims }) => adapter.upsertMany(claims, state)),
  on(ClaimActions.loadAllFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action): State {
  return claimReducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const getIds = selectIds;
export const getEntities = selectEntities;
export const getAll = selectAll;
export const getTotalCount = selectTotal;
export const getSelected = (state: State) => state.selected;
