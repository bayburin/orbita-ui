import * as moment from 'moment';

import { Runtime } from './runtime.model';
import { IRuntimeBuilder } from '@modules/claim/builders/i-runtime.builder';
import { IRuntime } from '@modules/claim/interfaces/runtime.interface';

describe('Runtime', () => {
  let iRuntime: IRuntime;

  beforeEach(() => {
    iRuntime = new IRuntimeBuilder().testBuild();
  });

  describe('Constructor', () => {
    it('should create instance of Question', () => {
      expect(new Runtime(iRuntime)).toBeTruthy();
    });

    it('should accept values', () => {
      const runtime = new Runtime(iRuntime);

      expect(runtime.createdAt).toEqual(moment(iRuntime.created_at));
      expect(runtime.updatedAt).toEqual(moment(iRuntime.updated_at));
      expect(runtime.finishedAtPlan).toEqual(moment(iRuntime.finished_at_plan));
      expect(runtime.finishedAt).toEqual(moment(iRuntime.finished_at));
    });
  });
});
