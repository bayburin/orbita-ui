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
  works: any[];

  constructor(claim: any = {}) {
    this.id = claim.id;
    this.serviceId = claim.service_id;
    this.claimTemplateId = claim.claim_template_id;
    this.serviceName = claim.service_name;
    this.claimTemplateName = claim.claim_template_name;
    this.status = claim.status;
    this.priority = claim.priority;
    this.attrs = claim.attrs;
    this.rating = claim.rating;
    this.works = claim.works || [];
  }
}
