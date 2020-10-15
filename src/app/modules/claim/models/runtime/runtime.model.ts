import * as moment from 'moment';

import { IRuntime } from '@modules/claim/interfaces/runtime.interface';

export class Runtime {
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
  finishedAtPlan: moment.Moment;
  finishedAt: moment.Moment;

  constructor(runtime: IRuntime = { } as IRuntime) {
    this.createdAt = moment(runtime.created_at);
    this.updatedAt = moment(runtime.updated_at);
    this.finishedAtPlan = moment(runtime.finished_at_plan);
    this.finishedAt = moment(runtime.finished_at);
  }
}
