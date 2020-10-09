import { TestBed } from '@angular/core/testing';
import { Observable, throwError, of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { ClaimEffects } from '@modules/claim/store/effects/claim.effects';
import { ClaimService } from '@modules/claim/services/claim/claim.service';
import { ClaimServiceStub } from '@modules/claim/services/claim/claim.service.stub';
import { CLAIM_FEATURE_KEY, State } from '@modules/claim/store/reducers/claim.reducer';
import * as ClaimActions from '@modules/claim/store/actions/claim.actions';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { Claim } from '@modules/claim/models/claim/claim.model';

describe('ClaimEffects', () => {
  let actions$: Observable<Action>;
  let effects: ClaimEffects;
  let store: MockStore<State>;
  let claimService: ClaimService;
  const initialState = {
    [CLAIM_FEATURE_KEY]: {
      ids: [],
      claims: null,
      selected: null,
      loading: false,
      loaded: false,
      error: null
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClaimEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: ClaimService, useClass: ClaimServiceStub }
      ]
    });

    effects = TestBed.inject(ClaimEffects);
    store = TestBed.inject(MockStore);
    claimService = TestBed.inject(ClaimService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadClaims', () => {
    beforeEach(() => {
      actions$ = of(ClaimActions.loadAll);
    });

    it('should call ClaimService.getClaims API if claims is null', () => {
      spyOn(claimService, 'getClaims').and.callThrough();

      effects.loadClaims$.subscribe(() => {
        expect(claimService.getClaims).toHaveBeenCalled();
      });
    });

    it('should not call ClaimService.getClaims API if claims is not null', () => {
      spyOn(claimService, 'getClaims').and.callThrough();
      store.overrideSelector(ClaimSelectors.getEntities, { 1: new Claim({ id: 1 }) });

      effects.loadClaims$.subscribe(() => {
        expect(claimService.getClaims).not.toHaveBeenCalled();
      });
    });

    it('should call ClaimActions.loadAllSuccess action if API respond with success status', () => {
      const iClaim = {
        id: 1,
        service_name: 'test'
      } as IClaim;

      spyOn(claimService, 'getClaims').and.returnValue(of([iClaim]));

      effects.loadClaims$.subscribe(action => {
        expect(action).toEqual(ClaimActions.loadAllSuccess({ claims: [new Claim(iClaim)] }));
      });
    });

    it('should call ClaimActions.loadAllFailure action if API respond with failure status', () => {
      spyOn(claimService, 'getClaims').and.callFake(() => {
        return throwError({ error: 'Error message' });
      });

      effects.loadClaims$.subscribe(action => {
        expect(action).toEqual(ClaimActions.loadAllFailure({ error: { error: 'Error message' } }));
      });
    });
  });
});
