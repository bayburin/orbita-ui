import { IClaimBuilder } from '@modules/claim/builders/i-claim.builder';
import { ISdRequest } from '@modules/sd-request/interfaces/sd-request.interface';
import { IWork } from '@modules/claim/interfaces/work.interface';

export class ISdRequestBuilder extends IClaimBuilder {
  protected claim: ISdRequest;

  constructor() {
    super();

    this.claim.service_id = 1;
    this.claim.claim_template_id = 1;
    this.claim.service_name = 'Service Name';
    this.claim.claim_template_name = 'Claim Template Name';
    this.claim.rating = null;
  }

  build(): ISdRequest {
    return this.claim;
  }

  service_id(serviceId: number): ISdRequestBuilder {
    this.claim.service_id = serviceId;

    return this;
  }

  claim_template_id(claimTemplateId: number): ISdRequestBuilder {
    this.claim.claim_template_id = claimTemplateId;

    return this;
  }

  service_name(serviceName: string): ISdRequestBuilder {
    this.claim.service_name = serviceName;

    return this;
  }

  claim_template_name(claimTemplateName: string): ISdRequestBuilder {
    this.claim.claim_template_name = claimTemplateName;

    return this;
  }

  rating(rating: number): ISdRequestBuilder {
    this.claim.rating = rating;

    return this;
  }

  works(works: IWork[]): ISdRequestBuilder {
    this.claim.works = works;

    return this;
  }
}
