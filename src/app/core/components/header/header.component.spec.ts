import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFacade } from '@core/facades/auth.facade';
import { AuthFacadeStub } from '@core/facades/auth.facade.stub';
import { HeaderComponent } from './header.component';
import { User } from '@core/models/user.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authFacade: AuthFacade;
  let user: User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: AuthFacade, useClass: AuthFacadeStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    user = new User({ fio: 'test' });
    authFacade = TestBed.inject(AuthFacade);
    spyOn(authFacade, 'getCurrentUser').and.returnValue(user);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set current user', () => {
    expect(component.user).toEqual(user);
  });

  describe('#logout', () => {
    it('should call "authFacade.logout" method', () => {
      const spy = spyOn(authFacade, 'logout');

      component.logout();

      expect(spy).toHaveBeenCalled();
    });
  });
});
