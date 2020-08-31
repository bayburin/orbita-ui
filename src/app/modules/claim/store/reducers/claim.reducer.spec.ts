import { Claim } from '@modules/claim/models/claim/claim.model';
import { reducer, State, initialState } from './claim.reducer';
import * as ClaimActions from '@modules/claim/store/actions/claim.actions';

describe('claimReducer', () => {
  let action: any;
  let state: State;
  let payload: any;

  it('should return default state if unknown action', () => {
    action = { type: 'foo' };

    expect(reducer(undefined, action)).toBe(initialState);
  });

  describe('with select action', () => {
    it('should set "selected" with payload value', () => {
      payload = { id: 1 };
      action = ClaimActions.select(payload);
      state = reducer(initialState, action);

      expect(state.selected).toEqual(payload.id);
    });
  });

  describe('loadAll', () => {
    it('should set "error" with null value', () => {
      action = ClaimActions.loadAll;
      state = reducer(initialState, action);

      expect(state.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should set ids and claims values with paylod value', () => {
      const claims = [new Claim({ id: 1, service_name: 'Test 1' }), new Claim({ id: 2, service_name: 2 })];
      const ClaimsObj = claims.reduce((map: any, obj: Claim) => {
        map[obj.id] = obj;

        return map;
      }, {});
      payload = { claims };
      action = ClaimActions.loadAllSuccess(payload);
      state = reducer(initialState, action);

      expect(state.ids).toEqual(claims.map(val => val.id));
      expect(state.claims).toEqual(ClaimsObj);
    });
  });

  describe('loadAllFailure', () => {
    it('should set "error" with payload value', () => {
      payload = { error: 'error message' };
      action = ClaimActions.loadAllFailure(payload);
      state = reducer(initialState, action);

      expect(state.error).toEqual(payload.error);
    });
  });
});
