import * as faker from 'faker';

import { ModelBuilder } from '@shared/builders/model.builder';
import { IWork } from '@modules/claim/interfaces/work.interface';
import { IHistory } from '@modules/claim/interfaces/history.interface';
import { IHistoryBuilder } from './i-history.builder';
import { IGroupBuilder } from '@modules/user/builders/i-group.builder';
import { IUserWorkBuilder } from './i-user-work.builder';

export class IWorkBuilder extends ModelBuilder<IWork> {
  constructor() {
    super();

    this.model = {
      id: null,
      claim_id: null,
      title: '',
      status: '',
      attrs: { },
      histories: [],
      group: new IGroupBuilder().build(),
      workers: []
    };
  }

  testBuild(): IWork {
    this.model.id = this.model.id || faker.random.number();
    this.model.claim_id = this.model.claim_id || faker.random.number();
    this.model.title = this.model.title || 'Test title';
    this.model.status = this.model.status || 'Test status';
    this.model.histories = this.model.histories.length > 0 ? this.model.histories : [new IHistoryBuilder().testBuild()];
    this.model.group = this.model.group.id ? this.model.group : new IGroupBuilder().build();
    this.model.workers = this.model.workers.length > 0 ? this.model.workers : [new IUserWorkBuilder().testBuild()];

    return this.model;
  }

  id(id: number): IWorkBuilder {
    this.model.id = id;

    return this;
  }

  claim_id(claimId: number): IWorkBuilder {
    this.model.claim_id = claimId;

    return this;
  }

  title(title: string): IWorkBuilder {
    this.model.title = title;

    return this;
  }

  status(status: string): IWorkBuilder {
    this.model.status = status;

    return this;
  }

  attrs(attrs: any): IWorkBuilder {
    this.model.attrs = attrs;

    return this;
  }

  histories(histories: IHistory[]): IWorkBuilder {
    this.model.histories = histories;

    return this;
  }
}
