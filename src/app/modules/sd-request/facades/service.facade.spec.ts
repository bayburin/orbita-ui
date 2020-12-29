import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { ServiceFacade } from './service.facade';
import { SERVICE_FEATURE_KEY, State } from '@modules/sd-request/store/service.reducer';
import * as ServiceActions from '@modules/sd-request/store/service.actions';
import * as ServiceSelectors from '@modules/sd-request/store/service.selectors';
import { IServiceBuilder } from '@modules/sd-request/builders/i-service.builder';

describe('ServiceFacade', () => {
  let actions$: Observable<Action>;
  let facade: ServiceFacade;
  let store: MockStore<State>;
  const initialState = {
    [SERVICE_FEATURE_KEY]: {
      ids: [],
      entities: { },
      error: null
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
    facade = TestBed.inject(ServiceFacade);
  });

  it('should call "ServiceSelectors.getAll" selector for services$ attribute and sort result array by "name" attribute', () => {
    const services = [new IServiceBuilder().name('b').testBuild(), new IServiceBuilder().name('a').testBuild()];

    store.overrideSelector(ServiceSelectors.getAll, services.slice());

    facade.services$.subscribe(result => {
      expect(result).toEqual([services[1], services[0]]);
    });
  });

  describe('#loadServices', () => {
    it('should dispatch "ServiceActions.loadAll" action', fakeAsync(() => {
      actions$ = of(ServiceActions.loadAll);
      const spy = spyOn(store, 'dispatch');

      facade.loadServices();
      tick(100);
      expect(spy).toHaveBeenCalledWith(ServiceActions.loadAll());
    }));
  });
});
