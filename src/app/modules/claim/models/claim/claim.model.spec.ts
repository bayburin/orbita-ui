import { Claim } from './claim.model';

fdescribe('Claim', () => {
  let iClaim: any;

  beforeEach(() => {
    iClaim = {
      id: 1,
      service_id: 1,
      claim_template_id: 1,
      service_name: 'Печать',
      claim_template_name: 'Заявка на печать КД',
      status: 'opened',
      priority: 'high',
      attrs: {},
      rating: null
    };
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
