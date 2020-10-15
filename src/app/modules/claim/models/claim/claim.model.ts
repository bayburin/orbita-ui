import * as moment from 'moment';

import { Work } from '@modules/claim/models/work/work.model';
import { IClaim } from '@modules/claim/interfaces/claim.interface';

export enum ClaimStatuses {
  OPENED = 'opened', // Открыта
  AT_WORK = 'at_work', // В работе
  CANCELED = 'canceled', // Отменена
  APPROVED = 'approved', // Согласована
  REOPENED = 'reopened' // Переоткрыта
}

export enum ClaimPriorities {
  DEFAULT = 'default',
  LOW = 'low',
  HIGH = 'high'
}

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
  createdAt: moment.Moment;
  finishedAtPlan: moment.Moment;

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
    this.createdAt = moment(claim.created_at); // ! TODO: убрать
    this.finishedAtPlan = moment(claim.finished_at_plan); // ! TODO: убрать
  }
}
