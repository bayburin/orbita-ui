import { History } from '@modules/claim/models/history/history.model';
import { HistoryFactory } from './history.factory';

describe('HistoryFactory', () => {
  const factory = HistoryFactory;

  describe('.create', () => {
    it('should create instance of History', () => {
      expect(factory.create()).toBeInstanceOf(History);
    });
  });
});
