import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';

import { JsonInterceptor } from './json.interceptor';

describe('JsonInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let mockRequest: TestRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JsonInterceptor,
          multi: true,
        }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('when headers does not exist', () => {
    beforeEach(() => {
      http.get('http://test').subscribe();
      mockRequest = httpMock.expectOne({ url: 'http://test' });
    });

    it('should add "Content-Type" and "Accept" headers if it does not exist', () => {
      expect(mockRequest.request.headers.get('Content-Type')).toEqual('application/json');
    });

    it('should add "Content-Type" and "Accept" headers if it does not exist', () => {
      expect(mockRequest.request.headers.get('Accept')).toEqual('application/json');
    });
  });

  it('should not add "Content-Type" header  if it is exist', () => {
    const headers = new HttpHeaders().set('Content-Type', 'text/html');

    http.get('http://test', { headers }).subscribe();
    mockRequest = httpMock.expectOne({ url: 'http://test' });

    expect(mockRequest.request.headers.get('Content-Type')).toEqual('text/html');
  });
});
