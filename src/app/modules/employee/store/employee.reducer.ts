import { createReducer, Action, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';
import { IExtendEmployee } from '@modules/employee/interfaces/employee.interface';
import * as EmployeeActions from '@modules/employee/store/employee.actions';

export const EMPLOYEE_FEATURE_KEY = 'employee';

export interface State extends EntityState<IBaseEmployee> {
  selected: IExtendEmployee;
  error?: HttpErrorResponse | null;
}

export const adapter: EntityAdapter<IBaseEmployee> = createEntityAdapter();

export const initialState: State = adapter.getInitialState({ selected: null });

const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.loadAll, state => ({ ...state, error: null })),
  on(EmployeeActions.loadAllSuccess, (state, { employees }) => adapter.addMany(employees, state)),
  on(EmployeeActions.loadAllFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action): State {
  return employeeReducer(state, action);
}

const {
  selectIds,
  selectEntities,
  selectAll
} = adapter.getSelectors();

export const getIds = selectIds;
export const getEntities = selectEntities;
export const getAll = selectAll;
