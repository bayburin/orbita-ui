import { History } from '@modules/claim/models/history/history.model';
import { WorkFactory } from './work.factory';
import { Work } from '@modules/claim/models/work/work.model';
import { IWorkBuilder } from '@modules/claim/builders/i-work.builder';
import { IHistoryBuilder } from '@modules/claim/builders/i-history.builder';

describe('WorkFactory', () => {
  const factory = WorkFactory;

  describe('.create', () => {
    it('should create instance of Work', () => {
      expect(factory.create()).toBeInstanceOf(Work);
    });

    it('should create array of History if array "histories" exist', () => {
      const history = new IHistoryBuilder().testBuild();
      const iWork = new IWorkBuilder().histories([history]).testBuild();
      const work = factory.create(iWork);

      work.histories.forEach(hist => {
        expect(hist).toBeInstanceOf(History);
      });
    });
  });
});
