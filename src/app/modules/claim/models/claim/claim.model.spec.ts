import { IWorkBuilder } from '@modules/claim/builders/i-work.builder';
import { ClaimFactory } from '@modules/claim/factories/claim/claim.factory';
import { IClaimBuilder } from '@modules/claim/builders/i-claim.builder';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { Claim } from './claim.model';
import { IWork } from '@modules/claim/interfaces/work.interface';
import { HistoryFactory } from '@modules/claim/factories/history/history.factory';
import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';

describe('Claim', () => {
  let iClaim: IClaim;

  beforeEach(() => {
    iClaim = new IClaimBuilder().build();
  });

  describe('Constructor', () => {
    it('should create instance of Claim', () => {
      expect(new Claim(iClaim)).toBeTruthy();
    });

    it('should accept values', () => {
      const claim = new Claim(iClaim);

      expect(claim.id).toEqual(iClaim.id);
    });
  });

  describe('get "lastHistory"', () => {
    it('should return last element of "histories" array from all works', () => {
      const works = [new IWorkBuilder().build(), new IWorkBuilder().build()];
      iClaim = new IClaimBuilder().works(works).build();
      const claim = ClaimFactory.create(ClaimTypes.SD_REQUEST, iClaim);
      const history = HistoryFactory.create(works[1].histories[0]);

      expect(claim.lastHistory).toEqual(history);
    });
  });

  describe('#isAnyWorkAction', () => {
    let claim: Claim;
    let works: IWork[];

    it('should return true if any work has any history', () => {
      works = [new IWorkBuilder().build(), new IWorkBuilder().build()];
      iClaim = new IClaimBuilder().works(works).build();
      claim = ClaimFactory.create(ClaimTypes.SD_REQUEST, iClaim);

      expect(claim.isAnyWorkAction()).toBeTrue();
    });

    it('should return false if no one history found', () => {
      iClaim = new IClaimBuilder().works([]).build();
      claim = ClaimFactory.create(ClaimTypes.SD_REQUEST, iClaim);

      expect(claim.isAnyWorkAction()).toBeFalse();
    });
  });
});
