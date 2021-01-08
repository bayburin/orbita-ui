import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { SearchTypes } from '@modules/employee/enums/search-type.enum';
import { IBaseEmployee } from '@modules/employee/interfaces/employee.interface';

export const loadAll = createAction(
  '[Employee] Load All',
  props<{ key: SearchTypes, term: string }>()
);

export const loadAllSuccess = createAction(
  '[Employee] Load All Success',
  props<{ employees: IBaseEmployee[] }>()
);

export const loadAllFailure = createAction(
  '[Employee] Load All Failure',
  props<{ error: HttpErrorResponse }>()
);

export const searchByTerm = createAction(
  '[Employee] Search By Term',
  props<{ term: string }>()
);
