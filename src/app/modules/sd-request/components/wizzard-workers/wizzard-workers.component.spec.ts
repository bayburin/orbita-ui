import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@shared/material.module';
import { WizzardWorkersComponent } from './wizzard-workers.component';
import { NewSdRequestFormService } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service';
import { NewSdRequestFormServiceStub } from '@modules/sd-request/services/new-sd-request-form/new-sd-request-form.service.stub';
import { MatListOption } from '@angular/material/list';
import { IUserBuilder } from '@modules/user/builders/i-user.builder';
import { IUser } from '@modules/user/interfaces/user.interface';

describe('WizzardWorkersComponent', () => {
  let component: WizzardWorkersComponent;
  let fixture: ComponentFixture<WizzardWorkersComponent>;
  let formService: NewSdRequestFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      declarations: [WizzardWorkersComponent],
      providers: [{ provide: NewSdRequestFormService, useClass: NewSdRequestFormServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizzardWorkersComponent);
    component = fixture.componentInstance;
    formService = TestBed.inject(NewSdRequestFormService);
    component.sdRequestForm = (formService as any).sdRequestForm.getValue();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#selectUserEvent', () => {
    it('should call "employee" setter for NewSdRequestFormService service', () => {
      const spy = spyOn(formService, 'selectUserEvent');
      const event = { value: 'bar' };

      component.selectUserEvent(event as MatListOption);

      expect(spy).toHaveBeenCalledWith(event as MatListOption);
    });
  });

  describe('#clearSearchUser', () => {
    it('should call "clearSearchUser" method for NewSdRequestFormService service', () => {
      const spy = spyOn(formService, 'clearSearchUser');

      component.clearSearchUser();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('#isUserSelected', () => {
    let user: IUser;

    beforeEach(() => {
      user = new IUserBuilder().id(1).testBuild();
      component.users.setValue([user]);
    });

    it('should return true if received user is already in the form', () => {
      expect(component.isUserSelected(user)).toBeTrue();
    });

    it('should return false if received user is not in the form', () => {
      expect(component.isUserSelected(new IUserBuilder().id(2).testBuild())).toBeFalse();
    })
  });

  describe('#isCurrentUser', () => {
    it('should call "isCurrentUser" method for NewSdRequestFormService service', () => {
      const user = new IUserBuilder().testBuild();
      const spy = spyOn(formService, 'isCurrentUser');

      component.isCurrentUser(user);

      expect(spy).toHaveBeenCalledWith(user);
    });
  });
});
