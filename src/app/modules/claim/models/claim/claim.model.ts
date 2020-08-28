export class Claim {
  id: number;
  serviceId: number;
  claimTemplateId: number;
  serviceName: string;
  claimTemplateName: string;
  status: string;
  priority: string;
  attrs: any;
  rating: number;

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
  }
}
