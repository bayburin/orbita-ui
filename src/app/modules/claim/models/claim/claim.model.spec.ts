import { IClaimBuilder } from '@modules/claim/builders/i-claim.builder';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { Claim } from './claim.model';

describe('Claim', () => {
  let iClaim: IClaim;

  beforeEach(() => {
    iClaim = new IClaimBuilder().build();
  });

  describe('Constructor', () => {
    it('should create instance of Question', () => {
      expect(new Claim(iClaim)).toBeTruthy();
    });

    it('should accept values', () => {
      const claim = new Claim(iClaim);

      expect(claim.id).toEqual(iClaim.id);
    });
  });
});
