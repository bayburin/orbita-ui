import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IServiceBuilder } from '@modules/sd-request/builders/i-service.builder';

import { environment } from '@env/environment';
import { ServiceDeskApi } from './service-desk.api';

describe('ServiceDeskApi', () => {
  let service: ServiceDeskApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(ServiceDeskApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getServices', () => {
    const services = [new IServiceBuilder().testBuild()];
    const api = `${environment.serviceDeskApi}/v1/services`;

    it('should return Observable with array of claims', () => {
      service.getServices().subscribe(result => {
        expect(result).toEqual(services);
      });

      httpMock.expectOne({
        method: 'GET',
        url: api
      }).flush(services);
    });
  });
});
