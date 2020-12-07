import { ISdRequestBuilder } from '@modules/sd-request/builders/i-sd-request.builder';
import { reducer, State, initialState, adapter } from './claim.reducer';
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
      const claims = [new ISdRequestBuilder().id(1).build(), new ISdRequestBuilder().id(2).build()];

      payload = { claims };
      action = ClaimActions.loadAllSuccess(payload);
      spyOn(adapter, 'upsertMany');
      state = reducer(initialState, action);

      expect(adapter.upsertMany).toHaveBeenCalledWith(claims, initialState);
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
