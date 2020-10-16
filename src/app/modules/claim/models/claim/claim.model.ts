import { ClaimStatuses, ClaimPriorities } from '@modules/claim/interfaces/claim.interface';
import { Work } from '@modules/claim/models/work/work.model';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { Runtime } from '@modules/claim/models/runtime/runtime.model';

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
}
