import { History } from '@modules/claim/models/history/history.model';
export class Work {
  id: number;
  claimId: number;
  title: string;
  status: string;
  attrs: string;
  histories: History[] = [];

  constructor(work: any = {}) {
    this.id = work.id;
    this.claimId = work.claim_id;
    this.title = work.title;
    this.status = work.status;
    this.attrs = work.attrs;
  }
}
