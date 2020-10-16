import { Runtime } from '@modules/claim/models/runtime/runtime.model';
import { RuntimeFactory } from './runtime.factory';

describe('RuntimeFactory', () => {
  const factory = RuntimeFactory;

  describe('.create', () => {
    it('should create instance of Runtime', () => {
      expect(factory.create()).toBeInstanceOf(Runtime);
    });
  });
});
