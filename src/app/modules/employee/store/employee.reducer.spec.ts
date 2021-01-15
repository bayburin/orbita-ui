import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import { reducer, State, initialState, adapter } from './employee.reducer';
import * as EmployeeActions from '@modules/employee/store/employee.actions';

describe('employeeReducer', () => {
  let action: any;
  let state: State;
  let payload: any;

  it('should return default state if unknown action', () => {
    action = { type: 'foo' };

    expect(reducer(undefined, action)).toBe(initialState);
  });

  describe('loadAll', () => {
    it('should set "error" with null value', () => {
      action = EmployeeActions.loadAll;
      state = reducer(initialState, action);

      expect(state.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should set ids and employees values with payload value', () => {
      const employees = [new IBaseEmployeeBuilder().testBuild(), new IBaseEmployeeBuilder().testBuild()];

      payload = { employees };
      action = EmployeeActions.loadAllSuccess(payload);
      spyOn(adapter, 'addMany');
      state = reducer(initialState, action);

      expect(adapter.addMany).toHaveBeenCalledWith(employees, initialState);
    });
  });

  describe('loadAllFailure', () => {
    it('should set "error" with payload value', () => {
      payload = { error: 'error message' };
      action = EmployeeActions.loadAllFailure(payload);
      state = reducer(initialState, action);

      expect(state.error).toEqual(payload.error);
    });
  });
});
