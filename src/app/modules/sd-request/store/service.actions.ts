import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { IService } from '@modules/sd-request/interfaces/service.interface';

export const loadAll = createAction('[Service] Load All');

export const loadAllSuccess = createAction(
  '[Service] Load All Success',
  props<{ services: IService[] }>()
);

export const loadAllFailure = createAction(
  '[Service] Load All Failure',
  props<{ error: HttpErrorResponse }>()
);
