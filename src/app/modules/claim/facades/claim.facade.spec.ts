import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, of, combineLatest } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import * as ClaimActions from '@modules/claim/store/actions/claim.actions';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';
import { CLAIM_FEATURE_KEY, State } from '@modules/claim/store/reducers/claim.reducer';
import { ClaimFacade } from '@modules/claim/facades/claim.facade';
import { ClaimFactory } from '@modules/claim/factories/claim/claim.factory';
import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';
import { UserFacade } from '@modules/user/facades/user.facade';
import { UserFacadeStub } from '@modules/user/facades/user.facade.stub';
import { ISdRequestBuilder } from '@modules/sd-request/builders/i-sd-request.builder';

describe('ClaimFacade', () => {
  let actions$: Observable<Action>;
  let facade: ClaimFacade;
  let store: MockStore<State>;
  let userFacade: UserFacade;
  const initialState = {
    [CLAIM_FEATURE_KEY]: {
      ids: [],
      entities: { },
      selected: null,
      loading: false,
      loaded: false,
      error: null
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserFacade, useClass: UserFacadeStub },
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ]
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(ClaimFacade);
    userFacade = TestBed.inject(UserFacade);
  });

  describe('#constructor', () => {
    it('should call "ClaimSelectors.getAll" selector', () => {
      const selectResult = [new ISdRequestBuilder().testBuild()];

      store.overrideSelector(ClaimSelectors.getAll, selectResult);
      combineLatest([facade.claims$, userFacade.users$]).subscribe(data => {
        expect(data[0]).toEqual(selectResult.map(el => ClaimFactory.create(ClaimTypes.SD_REQUEST, el, { users:  data[1] })));
      });
    });

    it('should call "ClaimSelectors.getEntity" selector', () => {
      const selectResult = new ISdRequestBuilder().testBuild();

      store.overrideSelector(ClaimSelectors.getEntity, selectResult);

      facade.claim$.subscribe(result => {
        expect(result).toEqual(ClaimFactory.create(ClaimTypes.SD_REQUEST, selectResult));
      });
    });
  });

  describe('#loadClaims', () => {
    it('should dispatch "ClaimActions.loadAll" action', fakeAsync(() => {
      actions$ = of(ClaimActions.loadAll);
      const spy = spyOn(store, 'dispatch');

      facade.loadClaims();
      tick(100);
      expect(spy).toHaveBeenCalledWith(ClaimActions.loadAll());
    }));
  });

  describe('#showWorkflow', () => {
    it('should dispatch "ClaimActions.select" action', fakeAsync(() => {
      actions$ = of(ClaimActions.select);
      const spy = spyOn(store, 'dispatch');
      const id = 1;

      facade.showWorkflow(id);
      tick(100);
      expect(spy).toHaveBeenCalledWith(ClaimActions.select({ id }));
    }));
  });
});
