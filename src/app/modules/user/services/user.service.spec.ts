import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { UserService } from './user.service';
import { IUserBuilder } from '@modules/user/builders/i-user.builder';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    const claims = [new IUserBuilder().id(1).build(), new IUserBuilder().id(2).build()];
    const api = `${environment.serverUrl}/api/v1/users`;

    it('should return Observable with array of users', () => {
      service.getUsers().subscribe(result => {
        expect(result).toEqual(claims);
      });

      httpMock.expectOne({
        method: 'GET',
        url: api
      }).flush(claims);
    });
  });
});
