import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';
import { History } from '@modules/claim/models/history/history.model';
import { ClaimStatuses } from '@modules/claim/enums/claim-statuses.enum';
import { ClaimPriorities } from '@modules/claim/enums/claim-priorities.enum';
import { Work } from '@modules/claim/models/work/work.model';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { Runtime } from '@modules/claim/models/runtime/runtime.model';
import { IUser } from '@modules/user/interfaces/user.interface';
import { oFlatMap } from '@shared/functions/flat-map';

export abstract class Claim {
  id: number;
  serviceId: number;
  appTemplateId: number;
  serviceName: string;
  appTemplateName: string;
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
    return oFlatMap((work: Work) => work.workers, this.works);
  }

  constructor(claim: IClaim) {
    this.id = claim.id;
    this.serviceId = claim.service_id;
    this.appTemplateId = claim.app_template_id;
    this.serviceName = claim.service_name;
    this.appTemplateName = claim.app_template_name;
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
