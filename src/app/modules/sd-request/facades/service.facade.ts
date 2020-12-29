import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import * as fromServices from '@modules/sd-request/store/service.reducer';
import * as ServiceActions from '@modules/sd-request/store/service.actions';
import * as ServiceSelectors from '@modules/sd-request/store/service.selectors';
import { IService } from '@modules/sd-request/interfaces/service.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceFacade {
  services$: Observable<IService[]>;
  error$: Observable<HttpErrorResponse>;

  constructor(private store: Store<fromServices.State>) {
    this.services$ = store.select(ServiceSelectors.getAll).pipe(map(services => services.sort((a, b) => a.name > b.name ? 1 : -1)));
    this.error$ = store.select(ServiceSelectors.getError);
  }

  /**
   * Загрузить список услуг.
   */
  loadServices(): void {
    this.store.dispatch(ServiceActions.loadAll());
  }
}
