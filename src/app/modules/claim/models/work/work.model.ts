import { IWork } from '@modules/claim/interfaces/work.interface';
import { History } from '@modules/claim/models/history/history.model';
import { IGroup } from '@modules/user/interfaces/group.interface';
export class Work {
  id: number;
  claimId: number;
  title: string;
  status: string;
  attrs: string;
  histories: History[] = [];
  group: IGroup;

  /**
   * Возвращает последний объект истории.
   */
  get lastHistory(): History {
    return this.histories[this.histories.length - 1];
  }

  constructor(work: IWork) {
    this.id = work.id;
    this.claimId = work.claim_id;
    this.title = work.title;
    this.status = work.status;
    this.attrs = work.attrs;
    this.group = work.group;
  }
}
