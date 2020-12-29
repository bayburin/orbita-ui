import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom, filter } from 'rxjs/operators';

import { ServiceDeskApi } from '@modules/sd-request/api/service-desk/service-desk.api';
import { State } from './service.reducer';
import * as ServiceActions from './service.actions';
import * as ServiceSelectors from './service.selectors';

@Injectable()
export class ServiceEffects {
  constructor(
    private actions$: Actions,
    private sdApi: ServiceDeskApi,
    private store: Store<State>
  ) { }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.loadAll),
      withLatestFrom(this.store.select(ServiceSelectors.getIds)),
      filter(([action, services]) => services.length === 0),
      mergeMap(() => this.sdApi.getServices()
        .pipe(
          map(services => ServiceActions.loadAllSuccess({ services })),
          catchError(error => of(ServiceActions.loadAllFailure({ error })))
        )
      )
    )
  );
}
