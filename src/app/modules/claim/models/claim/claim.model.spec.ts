import { SdRequest } from '@modules/sd-request/models/sd-request.model';
import { ISdRequestBuilder } from '@modules/sd-request/builders/i-sd-request.builder';
import { IWorkBuilder } from '@modules/claim/builders/i-work.builder';
import { ClaimFactory } from '@modules/claim/factories/claim/claim.factory';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { IWork } from '@modules/claim/interfaces/work.interface';
import { HistoryFactory } from '@modules/claim/factories/history/history.factory';
import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';

describe('Claim', () => {
  let iClaim: IClaim;

  beforeEach(() => {
    iClaim = new ISdRequestBuilder().testBuild();
  });

  describe('Constructor', () => {
    it('should create instance of Claim', () => {
      expect(new SdRequest(iClaim)).toBeTruthy();
    });

    it('should accept values', () => {
      const claim = new SdRequest(iClaim);

      expect(claim.id).toEqual(iClaim.id);
    });
  });

  describe('get "lastHistory"', () => {
    it('should return last element of "histories" array from all works', () => {
      const works = [new IWorkBuilder().testBuild(), new IWorkBuilder().testBuild()];
      iClaim = new ISdRequestBuilder().works(works).testBuild();
      const claim = ClaimFactory.create(ClaimTypes.SD_REQUEST, iClaim);
      const history = HistoryFactory.create(works[1].histories[0]);

      expect(claim.lastHistory).toEqual(history);
    });
  });

  describe('#isAnyWorkAction', () => {
    let claim: SdRequest;
    let works: IWork[];

    it('should return true if any work has any history', () => {
      works = [new IWorkBuilder().testBuild(), new IWorkBuilder().testBuild()];
      iClaim = new ISdRequestBuilder().works(works).testBuild();
      claim = ClaimFactory.create(ClaimTypes.SD_REQUEST, iClaim);

      expect(claim.isAnyWorkAction()).toBeTrue();
    });

    it('should return false if no one history found', () => {
      iClaim = new ISdRequestBuilder().build();
      claim = ClaimFactory.create(ClaimTypes.SD_REQUEST, iClaim);

      expect(claim.isAnyWorkAction()).toBeFalse();
    });
  });
});
