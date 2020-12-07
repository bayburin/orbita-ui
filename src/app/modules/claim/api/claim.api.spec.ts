import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { ClaimApi } from './claim.api';
import { ISdRequestBuilder } from '@modules/sd-request/builders/i-sd-request.builder';

describe('ClaimApi', () => {
  let service: ClaimApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ClaimApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getClaims', () => {
    const claims = [new ISdRequestBuilder().id(1).build(), new ISdRequestBuilder().id(2).build()];
    const api = `${environment.serverApi}/v1/claims`;

    it('should return Observable with array of claims', () => {
      service.getClaims().subscribe(result => {
        expect(result).toEqual(claims);
      });

      httpMock.expectOne({
        method: 'GET',
        url: api
      }).flush(claims);
    });
  });
});
