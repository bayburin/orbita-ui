import * as moment from 'moment';

import { IRuntime } from '@modules/claim/interfaces/runtime.interface';

export class IRuntimeBuilder {
  runtime: IRuntime;

  constructor() {
    this.runtime = {
      created_at: moment().format(),
      updated_at: moment().format(),
      finished_at_plan: moment().format(),
      finished_at: moment().format()
    };
  }

  build(): IRuntime {
    return this.runtime;
  }

  created_at(createdAt: string): IRuntimeBuilder {
    this.runtime.created_at = createdAt;

    return this;
  }

  updated_at(updatedAt: string): IRuntimeBuilder {
    this.runtime.updated_at = updatedAt;

    return this;
  }

  finished_at_plan(finishedAtPlan: string): IRuntimeBuilder {
    this.runtime.finished_at_plan = finishedAtPlan;

    return this;
  }

  finished_at(finishedAt: string): IRuntimeBuilder {
    this.runtime.finished_at = finishedAt;

    return this;
  }
}
