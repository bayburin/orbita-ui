import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'environments/environment';
import { ClaimService } from './claim.service';
import { IClaim } from '@modules/claim/interfaces/claim.interface';

describe('ClaimService', () => {
  let service: ClaimService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ClaimService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getClaims', () => {
    const claims = [{ id: 1 }, { id: 2 }] as IClaim[];
    const api = `${environment.serverUrl}/api/v1/claims`;

    it('should return Observable with array of claims', () => {
      service.getClaims().subscribe(result => {
        console.log(result);
        expect(result).toEqual(claims);
      });

      httpTestingController.expectOne({
        method: 'GET',
        url: api
      }).flush(claims);
    });
  });
});
