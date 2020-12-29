import { reducer, State, initialState, adapter } from './service.reducer';
import * as ServiceActions from './service.actions';
import { IServiceBuilder } from '@modules/sd-request/builders/i-service.builder';

describe('serviceReducer', () => {
  let action: any;
  let state: State;
  let payload: any;

  it('should return default state if unknown action', () => {
    action = { type: 'foo' };

    expect(reducer(undefined, action)).toBe(initialState);
  });

  describe('loadAll', () => {
    it('should set "error" with null value', () => {
      action = ServiceActions.loadAll;
      state = reducer(initialState, action);

      expect(state.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should set ids and services values with paylod value', () => {
      const services = [new IServiceBuilder().testBuild(), new IServiceBuilder().testBuild()];

      payload = { services };
      action = ServiceActions.loadAllSuccess(payload);
      spyOn(adapter, 'upsertMany');
      state = reducer(initialState, action);

      expect(adapter.upsertMany).toHaveBeenCalledWith(services, initialState);
    });
  });

  describe('loadAllFailure', () => {
    it('should set "error" with payload value', () => {
      payload = { error: 'error message' };
      action = ServiceActions.loadAllFailure(payload);
      state = reducer(initialState, action);

      expect(state.error).toEqual(payload.error);
    });
  });
});
