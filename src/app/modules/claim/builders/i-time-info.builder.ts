import * as moment from 'moment';

import { ITimeInfo } from '@modules/claim/interfaces/time-info.interface';

export class ITimeInfoBuilder {
  timeInfo: ITimeInfo;

  constructor() {
    this.timeInfo = {
      created_at: moment().format(),
      updated_at: moment().format(),
      finished_at_plan: moment().format(),
      finished_at: moment().format()
    };
  }

  build(): ITimeInfo {
    return this.timeInfo;
  }

  created_at(createdAt: string): ITimeInfoBuilder {
    this.timeInfo.created_at = createdAt;

    return this;
  }

  updated_at(updatedAt: string): ITimeInfoBuilder {
    this.timeInfo.updated_at = updatedAt;

    return this;
  }

  finished_at_plan(finishedAtPlan: string): ITimeInfoBuilder {
    this.timeInfo.finished_at_plan = finishedAtPlan;

    return this;
  }

  finished_at(finishedAt: string): ITimeInfoBuilder {
    this.timeInfo.finished_at = finishedAt;

    return this;
  }
}
