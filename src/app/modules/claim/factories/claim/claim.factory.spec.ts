import { ClaimFactory } from '@modules/claim/factories/claim/claim.factory';
import { Claim } from '@modules/claim/models/claim/claim.model';
import { IClaimBuilder } from '@modules/claim/builders/i-claim.builder';
import { Runtime } from '@modules/claim/models/runtime/runtime.model';
import { IWorkBuilder } from '@modules/claim/builders/i-work.builder';
import { Work } from '@modules/claim/models/work/work.model';

describe('ClaimFactory', () => {
  const factory = ClaimFactory;

  describe('.create', () => {
    it('should create instance of Claim', () => {
      expect(factory.create()).toBeInstanceOf(Claim);
    });

    it('should create instance of Runtime if attribute "runtime" exist', () => {
      const iClaim = new IClaimBuilder().build();
      const claim = factory.create(iClaim);

      expect(claim.runtime).toBeInstanceOf(Runtime);
    });

    it('should create array of Work if array "works" exist', () => {
      const work = new IWorkBuilder().build();
      const iClaim = new IClaimBuilder().works([work]).build();
      const claim = factory.create(iClaim);

      claim.works.forEach(w => {
        expect(w).toBeInstanceOf(Work);
      });
    });
  });
});
