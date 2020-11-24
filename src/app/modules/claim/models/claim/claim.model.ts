import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';
import { History } from '@modules/claim/models/history/history.model';
import { ClaimStatuses } from '@modules/claim/enums/claim-statuses.enum';
import { ClaimPriorities } from '@modules/claim/enums/claim-priorities.enum';
import { Work } from '@modules/claim/models/work/work.model';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { Runtime } from '@modules/claim/models/runtime/runtime.model';
import { IUser } from '@modules/user/interfaces/user.interface';

export class Claim {
  id: number;
  serviceId: number;
  claimTemplateId: number;
  serviceName: string;
  claimTemplateName: string;
  status: ClaimStatuses;
  priority: ClaimPriorities;
  attrs: any;
  rating: number;
  works: Work[] = [];
  runtime: Runtime;
  readonly type: ClaimTypes;

  /**
   * Возвращает самый последний объект истории из всех включенных работ.
   */
  get lastHistory(): History {
    let last = null;

    this.works.forEach(work => {
      last = last || work.lastHistory;
      if (work.lastHistory && work.lastHistory.createdAt.isSameOrAfter(last.createdAt)) {
        last = work.lastHistory;
      }
    });

    return last;
  }

  get workers(): IUser[] {
    return this.works.flatMap((work: Work) => work.workers);
  }

  constructor(claim: IClaim) {
    this.id = claim.id;
    this.serviceId = claim.service_id;
    this.claimTemplateId = claim.claim_template_id;
    this.serviceName = claim.service_name;
    this.claimTemplateName = claim.claim_template_name;
    this.status = claim.status;
    this.priority = claim.priority;
    this.attrs = claim.attrs;
    this.rating = claim.rating;
  }

  /**
   * Возвращает true, если в истории заявки присутствует какое-либо событие, связанное с работами.
   */
  isAnyWorkAction(): boolean {
    return this.works.some(work => work.histories.length);
  }
}
