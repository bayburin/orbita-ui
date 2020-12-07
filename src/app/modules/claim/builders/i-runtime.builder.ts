import * as moment from 'moment';

import { ModelBuilder } from '@shared/builders/model.builder';
import { IRuntime } from '@modules/claim/interfaces/runtime.interface';

export class IRuntimeBuilder extends ModelBuilder<IRuntime> {
  constructor() {
    super();

    this.model = {
      created_at: '',
      updated_at: '',
      finished_at_plan: '',
      finished_at: ''
    };
  }

  testBuild(): IRuntime {
    this.model.created_at = this.model.created_at || moment().format();
    this.model.updated_at = this.model.updated_at || moment().format();
    this.model.finished_at_plan = this.model.finished_at_plan || moment().format();
    this.model.finished_at = this.model.finished_at || moment().format();

    return this.model;
  }

  created_at(createdAt: string): IRuntimeBuilder {
    this.model.created_at = createdAt;

    return this;
  }

  updated_at(updatedAt: string): IRuntimeBuilder {
    this.model.updated_at = updatedAt;

    return this;
  }

  finished_at_plan(finishedAtPlan: string): IRuntimeBuilder {
    this.model.finished_at_plan = finishedAtPlan;

    return this;
  }

  finished_at(finishedAt: string): IRuntimeBuilder {
    this.model.finished_at = finishedAt;

    return this;
  }
}
