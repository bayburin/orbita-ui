import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import * as ClaimActions from '@modules/claim/store/actions/claim.actions';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';
import { CLAIM_FEATURE_KEY, State } from '@modules/claim/store/reducers/claim.reducer';
import { ClaimFacade } from '@modules/claim/facades/claim.facade';
import { ClaimFactory } from '@modules/claim/factories/claim/claim.factory';
import { IClaimBuilder } from '@modules/claim/builders/i-claim.builder';

describe('ClaimFacade', () => {
  let actions$: Observable<Action>;
  let facade: ClaimFacade;
  let store: MockStore<State>;
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
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ]
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(ClaimFacade);
  });

  describe('#constructor', () => {
    it('should call "ClaimSelectors.getAll" selector', () => {
      const selectResult = [new IClaimBuilder().build()];

      store.overrideSelector(ClaimSelectors.getAll, selectResult);

      facade.claims$.subscribe(result => {
        expect(result).toEqual(selectResult.map(el => ClaimFactory.create(el)));
      });
    });

    it('should call "ClaimSelectors.getEntity" selector', () => {
      const selectResult = new IClaimBuilder().build();

      store.overrideSelector(ClaimSelectors.getEntity, selectResult);

      facade.claim$.subscribe(result => {
        expect(result).toEqual(ClaimFactory.create(selectResult));
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
