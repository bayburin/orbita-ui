import { SdRequest } from './sd-request.model';
import { ISdRequest } from '@modules/sd-request/interfaces/sd-request.interface';
import { ISdRequestBuilder } from '@modules/sd-request/builders/i-sd-request.builder';

describe('SdRequest', () => {
  let attrs: ISdRequest;

  describe('Constructor', () => {
    beforeEach(() => {
      attrs = new ISdRequestBuilder().testBuild();
    });

    it('should create instance of SdRequest', () => {
      expect(new SdRequest(attrs)).toBeTruthy();
    });

    it('should accept values', () => {
      const request = new SdRequest(attrs);

      expect(request.id).toEqual(attrs.id);
    });
  });
});
