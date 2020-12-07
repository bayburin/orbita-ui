import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { UserApi } from './user.api';
import { IUserBuilder } from '@modules/user/builders/i-user.builder';

describe('UserApi', () => {
  let service: UserApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(UserApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getUsers', () => {
    const claims = [new IUserBuilder().id(1).testBuild(), new IUserBuilder().id(2).testBuild()];
    const api = `${environment.serverApi}/v1/users`;

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
