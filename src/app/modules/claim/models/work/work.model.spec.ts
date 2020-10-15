import { IWork } from '@modules/claim/interfaces/work.interface';
import { IWorkBuilder } from '@modules/claim/builders/i-work.builder';
import { Work } from '@modules/claim/models/work/work.model';

describe('Work', () => {
  let iWork: IWork;

  beforeEach(() => {
    iWork = new IWorkBuilder().build();
  });

  describe('Constructor', () => {
    it('should create instance of Question', () => {
      expect(new Work(iWork)).toBeTruthy();
    });

    it('should accept values', () => {
      const runtime = new Work(iWork);

      expect(runtime.id).toEqual(iWork.id);
      expect(runtime.claimId).toEqual(iWork.claim_id);
    });
  });
});
