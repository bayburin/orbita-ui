import { Claim } from '@modules/claim/models/claim/claim.model';
import * as claimActions from '@modules/claim/store/actions/claim.actions';

export interface State {
  ids: number[];
  claims: { [id: number]: Claim };
  selected: number;
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  ids: [],
  claims: { },
  selected: null,
  loading: false,
  loaded: false
};

export function reducer(state: State = initialState, action: claimActions.Actions): State {
  switch (action.type) {
    case claimActions.ActionTypes.Select:
      const id = action.payload;

      return {
        ...state,
        selected: id
      };
    case claimActions.ActionTypes.LoadAll:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case claimActions.ActionTypes.LoadAllSuccess:
      // ! TODO: Тут ошибка. payload.claim содержит массив, а не объект. Нужен адаптер
      return {
        ...state,
        ids: action.payload.ids,
        claims: action.payload.claims,
        loading: false,
        loaded: true
      };
    default:
      return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getClaims = (state: State) => state.claims;
export const getSelected = (state: State) => state.selected;
