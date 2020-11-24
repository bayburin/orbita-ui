import { ISdRequestBuilder } from '@modules/sd-request/builders/i-sd-request.builder';
import { SdRequest } from '@modules/sd-request/models/sd-request.model';
import { SdRequestFactory } from './sd-request.factory';
import { Runtime } from '@modules/claim/models/runtime/runtime.model';
import { IWorkBuilder } from '@modules/claim/builders/i-work.builder';
import { Work } from '@modules/claim/models/work/work.model';

describe('SdRequestFactory', () => {
  let factory: SdRequestFactory;

  beforeEach(() => {
    factory = new SdRequestFactory();
  });

  describe('.create', () => {
    it('should create instance of SdRequest', () => {
      expect(factory.create()).toBeInstanceOf(SdRequest);
    });

    it('should create instance of Runtime if attribute "runtime" exist', () => {
      const iRequest = new ISdRequestBuilder().build();
      const request = factory.create(iRequest);

      expect(request.runtime).toBeInstanceOf(Runtime);
    });

    it('should create array of Work if array "works" exist', () => {
      const work = new IWorkBuilder().build();
      const iRequest = new ISdRequestBuilder().works([work]).build();
      const request = factory.create(iRequest);

      request.works.forEach(w => {
        expect(w).toBeInstanceOf(Work);
      });
    });
  });
});
