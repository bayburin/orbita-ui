export class Work {
  id: number;
  claimId: number;
  title: string;
  status: string;
  attrs: string;
  histories: [];

  constructor(work: any = {}) {
    this.id = work.id;
    this.claimId = work.claim_id;
    this.title = work.title;
    this.status = work.status;
    this.attrs = work.attrs;
    this.histories = work.histories;
  }
}
