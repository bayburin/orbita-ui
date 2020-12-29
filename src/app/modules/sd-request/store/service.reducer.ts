import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

import { IService } from '@modules/sd-request/interfaces/service.interface';
import * as ServiceActions from './service.actions';

export const SERVICE_FEATURE_KEY = 'service';

export interface State extends EntityState<IService> {
  error?: HttpErrorResponse | null;
}

export const adapter: EntityAdapter<IService> = createEntityAdapter();

export const initialState: State = adapter.getInitialState({ error: null });

const serviceReducer = createReducer(
  initialState,
  on(ServiceActions.loadAll, (state) => ({ ...state, error: null })),
  on(ServiceActions.loadAllSuccess, (state, { services }) => adapter.upsertMany(services, state)),
  on(ServiceActions.loadAllFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action): State {
  return serviceReducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll
} = adapter.getSelectors();

export const getIds = selectIds;
export const getEntities = selectEntities;
export const getAll = selectAll;
export const getError = (state: State) => state.error;
