import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as EmployeeActions from '@modules/employee/store/employee.actions';
import * as EmployeeSelectors from '@modules/employee/store/employee.selectors';
import { EmployeeFacade } from './employee.facade';
import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import { EMPLOYEE_FEATURE_KEY, State } from '@modules/employee/store/employee.reducer';
import { IBaseEmployeeGroup } from '@modules/employee/interfaces/base-employee-group.interface';

describe('EmployeeFacade', () => {
  let actions$: Observable<Action>;
  let facade: EmployeeFacade;
  let store: MockStore<State>;
  const initialState = {
    [EMPLOYEE_FEATURE_KEY]: {
      ids: [],
      entities: { },
      selected: null
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ]
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(EmployeeFacade);
  });

  it('should call "EmployeeSelectors.getAll" selector for employees$ attribute', () => {
    const employees = [new IBaseEmployeeBuilder().testBuild()];

    store.overrideSelector(EmployeeSelectors.getAll, employees);

    facade.employees$.subscribe(data => {
      expect(data).toEqual(employees);
    });
  });

  describe('#searchEmployees', () => {
    it('should dispatch "EmployeeActions.searchByTerm" action', fakeAsync(() => {
      actions$ = of(EmployeeActions.searchByTerm);
      const spy = spyOn(store, 'dispatch');
      const term = 'test term';

      facade.searchEmployees(term);
      tick(100);
      expect(spy).toHaveBeenCalledWith(EmployeeActions.searchByTerm({ term }));
    }));
  });

  describe('#createGroups', () => {
    it('should return employees groups by dept', () => {
      const employee = new IBaseEmployeeBuilder().testBuild();
      const resultGroup: IBaseEmployeeGroup = {
        dept: employee.departmentForAccounting,
        employees: [employee]
      };

      store.overrideSelector(EmployeeSelectors.getAll, [employee]);

      expect(facade.createGroups([employee])).toEqual([resultGroup]);
    });
  });
});
