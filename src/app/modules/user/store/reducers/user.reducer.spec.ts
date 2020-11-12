import { IUserBuilder } from '@modules/user/builders/i-user.builder';
import { reducer, State, initialState, adapter } from './user.reducer';
import * as UserActions from '@modules/user/store/actions/user.actions';

describe('userReducer', () => {
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
      action = UserActions.select(payload);
      state = reducer(initialState, action);

      expect(state.selected).toEqual(payload.id);
    });
  });

  describe('loadAll', () => {
    it('should set "error" with null value', () => {
      action = UserActions.loadAll;
      state = reducer(initialState, action);

      expect(state.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should set ids and users values with paylod value', () => {
      const users = [new IUserBuilder().id(1).build(), new IUserBuilder().id(2).build()];

      payload = { users };
      action = UserActions.loadAllSuccess(payload);
      spyOn(adapter, 'upsertMany');
      state = reducer(initialState, action);

      expect(adapter.upsertMany).toHaveBeenCalledWith(users, initialState);
    });
  });

  describe('loadAllFailure', () => {
    it('should set "error" with payload value', () => {
      payload = { error: 'error message' };
      action = UserActions.loadAllFailure(payload);
      state = reducer(initialState, action);

      expect(state.error).toEqual(payload.error);
    });
  });
});
