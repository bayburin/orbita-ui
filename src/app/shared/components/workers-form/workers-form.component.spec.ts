import { IUserBuilder } from '@modules/user/builders/i-user.builder';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthHelper, AuthHelperStub } from '@iss/ng-auth-center';
import { of } from 'rxjs';

import { MaterialModule } from '@shared/material.module';
import { WorkersFormComponent } from './workers-form.component';
import { UserFacade } from '@modules/user/facades/user.facade';
import { UserFacadeStub } from '@modules/user/facades/user.facade.stub';
import { MatListOption } from '@angular/material/list';
import { IUser } from '@modules/user/interfaces/user.interface';

describe('WorkersFormComponent', () => {
  let component: WorkersFormComponent;
  let fixture: ComponentFixture<WorkersFormComponent>;
  let authHelper: AuthHelper;
  let userFacade: UserFacade;
  let users: IUser[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: UserFacade, useClass: UserFacadeStub },
        { provide: AuthHelper, useClass: AuthHelperStub }
      ],
      declarations: [WorkersFormComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersFormComponent);
    authHelper = TestBed.inject(AuthHelper);
    userFacade = TestBed.inject(UserFacade);
    users = [
      new IUserBuilder().fio('First').testBuild(),
      new IUserBuilder().fio('Second').testBuild(),
    ];
    userFacade.users$ = of(users);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users and call "UserFacade#createGroups" method if "searchWorker" input received any value', () => {
    const spy = spyOn(userFacade, 'createGroups');

    component.searchWorker.setValue('second');

    expect(spy.calls.argsFor(0)).toEqual([[users[1]]]);
  });

  describe('#selectWorkerEvent', () => {
    it('should add user to workers array if it is selected', () => {
      const user = new IUserBuilder().testBuild();
      const event = { selected: true, value: user };

      component.selectWorkerEvent(event as MatListOption);

      expect(component.workers).toContain(user);
    });

    it('should remove user from workers array if it is removed from selected', () => {
      const user = new IUserBuilder().testBuild();
      const event = { selected: false, value: user };

      component.workers = [user];
      component.selectWorkerEvent(event as MatListOption);

      expect(component.workers.length).toEqual(0);
    });
  });

  describe('#clearSearchWorker', () => {
    it('should clear "searchUser" input', () => {
      component.searchWorker.setValue('test value');
      component.clearSearchWorker();

      expect(component.searchWorker.value).toEqual('');
    });
  });

  describe('#isWorkerSelected', () => {
    let user: IUser;

    beforeEach(() => {
      user = new IUserBuilder().testBuild();
      component.workers = [user];
    });

    it('should return true if worker selected', () => {
      expect(component.isWorkerSelected(user)).toBeTrue();
    });

    it('should return false if worker is not selected', () => {
      expect(component.isWorkerSelected(new IUserBuilder().id(2).testBuild())).toBeFalse();
    });
  });

  describe('#isCurrentUser', () => {
    let currentUser: IUser;
    let worker: IUser;

    beforeEach(() => {
      currentUser = new IUserBuilder().testBuild();
      worker = new IUserBuilder().id(123).testBuild();
      component.workers = [currentUser, worker];
      spyOn(authHelper, 'getJwtPayload').and.returnValue(currentUser);
    });

    it('should return true if worker is current user', () => {
      expect(component.isCurrentUser(currentUser)).toBeTrue();
    });

    it('should return false if worker is not current user', () => {
      expect(component.isCurrentUser(worker)).toBeFalse();
    });
  });
});
