import { IWork } from '@modules/claim/interfaces/work.interface';

export class IWorkBuilder {
  private work: IWork;

  constructor() {
    this.work = {
      id: 1,
      claim_id: 1,
      title: 'Title',
      status: 'Status',
      attrs: { }
    };
  }

  build(): IWork {
    return this.work;
  }

  id(id: number): IWorkBuilder {
    this.work.id = id;

    return this;
  }

  claim_id(claimId: number): IWorkBuilder {
    this.work.claim_id = claimId;

    return this;
  }

  title(title: string): IWorkBuilder {
    this.work.title = title;

    return this;
  }

  status(status: string): IWorkBuilder {
    this.work.status = status;

    return this;
  }

  attrs(attrs: any): IWorkBuilder {
    this.work.attrs = attrs;

    return this;
  }
}
