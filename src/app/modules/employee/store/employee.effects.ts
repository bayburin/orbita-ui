import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { EmployeeApi } from '@modules/employee/api/employee.api';
import * as EmployeeActions from './employee.actions';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeApi: EmployeeApi
  ) { }

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadAll),
      mergeMap(action =>
        this.employeeApi.getEmployees(action.key, action.term).pipe(
          map(employees => EmployeeActions.loadAllSuccess({ employees })),
          catchError(error => of(EmployeeActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
