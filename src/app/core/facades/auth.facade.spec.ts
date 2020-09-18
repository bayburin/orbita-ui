import { TestBed } from '@angular/core/testing';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';

import { AuthFacade } from '@core/facades/auth.facade';
import { User } from '@core/models/user.model';

fdescribe('AuthFacade', () => {
  let authHelper: AuthHelper;
  let facade: AuthFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthHelper, useClass: AuthHelperStub }]
    });

    authHelper = TestBed.inject(AuthHelper);
    facade = TestBed.inject(AuthFacade);
  });

  describe('#getCurrentUser', () => {
    let spyPayload: jasmine.Spy;

    beforeEach(() => {
      spyPayload = spyOn(authHelper, 'getJwtPayload');
    });

    it('should return User instance if getJwtPayload return data', () => {
      spyPayload.and.returnValue({});

      expect(facade.getCurrentUser()).toBeInstanceOf(User);
    });

    it('should return null if getJwtPayload return null', () => {
      spyPayload.and.returnValue(null);

      expect(facade.getCurrentUser()).toBeNull();
    });
  });

  describe('#logout', () => {
    it('should call "logout" method', () => {
      const spy = spyOn(authHelper, 'logout');

      facade.logout();

      expect(spy).toHaveBeenCalled();
    });
  });
});
