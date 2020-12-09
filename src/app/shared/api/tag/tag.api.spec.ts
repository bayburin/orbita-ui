import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { TagApi } from './tag.api';
import { ITagBuilder } from '@shared/builders/tag.builder';

fdescribe('TagApi', () => {
  let service: TagApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(TagApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getTags', () => {
    const tags = [new ITagBuilder().testBuild(), new ITagBuilder().testBuild()];
    const api = `${environment.serverApi}/v1/tags`;

    it('should return Observable with array of tags', () => {
      service.getTags().subscribe(result => {
        expect(result).toEqual(tags);
      });

      httpMock.expectOne({
        method: 'GET',
        url: api
      }).flush(tags);
    });
  });
});
