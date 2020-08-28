import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from '../state/app.state';
import { claimReducer } from '@modules/claim/store/reducers/claim.reducers';

export const appReducers: ActionReducerMap<IAppState> = {
  claims: claimReducer
};
