import * as moment from 'moment';

import { IRuntime } from '@modules/claim/interfaces/runtime.interface';

export class Runtime {
  createdAt: moment.Moment = null;
  updatedAt: moment.Moment = null;
  finishedAtPlan: moment.Moment = null;
  finishedAt: moment.Moment = null;

  constructor(runtime: IRuntime) {
    this.createdAt = moment(runtime.created_at);
    this.updatedAt = moment(runtime.updated_at);

    if (runtime.finished_at_plan) {
      this.finishedAtPlan = moment(runtime.finished_at_plan);
    }
    if (runtime.finished_at) {
      this.finishedAt = moment(runtime.finished_at);
    }
  }
}
