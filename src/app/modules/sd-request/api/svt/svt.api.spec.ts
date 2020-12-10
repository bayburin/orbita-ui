import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { SvtApi } from './svt.api';
import { ISvtItemBuilder } from '@modules/sd-request/builders/i-svt-item.builder';

describe('SvtApi', () => {
  let service: SvtApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(SvtApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getServices', () => {
    const items = [new ISvtItemBuilder().testBuild()];
    const idTn = 12345;
    const api = `${environment.svtApi}/user_isses/${idTn}/items`;

    it('should return Observable with array of equipments', () => {
      service.getUserItems(idTn).subscribe(result => {
        expect(result).toEqual(items);
      });

      httpMock.expectOne({
        method: 'GET',
        url: api
      }).flush(items);
    });
  });
});
