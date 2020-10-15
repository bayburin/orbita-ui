import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { ClaimService } from './claim.service';
import { IClaimBuilder } from '@modules/claim/builders/i-claim.builder';

describe('ClaimService', () => {
  let service: ClaimService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ClaimService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getClaims', () => {
    const claims = [new IClaimBuilder().id(1).build(), new IClaimBuilder().id(2).build()];
    const api = `${environment.serverUrl}/api/v1/claims`;

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
