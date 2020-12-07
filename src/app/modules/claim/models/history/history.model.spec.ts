import { IHistory } from '@modules/claim/interfaces/history.interface';
import { IHistoryBuilder } from '@modules/claim/builders/i-history.builder';
import { History } from '@modules/claim/models/history/history.model';

describe('History', () => {
  let iHistory: IHistory;

  beforeEach(() => {
    iHistory = new IHistoryBuilder().testBuild();
  });

  describe('Constructor', () => {
    it('should create instance of History', () => {
      expect(new History(iHistory)).toBeTruthy();
    });

    it('should accept values', () => {
      const runtime = new History(iHistory);

      expect(runtime.id).toEqual(iHistory.id);
      expect(runtime.workId).toEqual(iHistory.work_id);
    });
  });
});
