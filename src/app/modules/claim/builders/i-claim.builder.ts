import { ClaimPriorities } from '@modules/claim/models/claim/claim.model';
import { ClaimStatuses } from '@modules/claim/models/claim/claim.model';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { IRuntimeBuilder } from './i-runtime.builder';
import { IRuntime } from '@modules/claim/interfaces/runtime.interface';

export class IClaimBuilder {
  private claim: IClaim;

  constructor() {
    this.claim = {
      id: 1,
      service_id: 1,
      claim_template_id: 1,
      service_name: 'Печать',
      claim_template_name: 'Заявка на печать КД',
      status: ClaimStatuses.OPENED,
      priority: ClaimPriorities.DEFAULT,
      claim_user: { },
      runtime: new IRuntimeBuilder().build(),
      attrs: { },
      rating: null
    };
  }

  build(): IClaim {
    return this.claim;
  }

  id(id: number): IClaimBuilder {
    this.claim.id = id;

    return this;
  }

  service_id(serviceId: number): IClaimBuilder {
    this.claim.service_id = serviceId;

    return this;
  }

  claim_template_id(claimTemplateId: number): IClaimBuilder {
    this.claim.claim_template_id = claimTemplateId;

    return this;
  }

  service_name(serviceName: string): IClaimBuilder {
    this.claim.service_name = serviceName;

    return this;
  }

  claim_template_name(claimTemplateName: string): IClaimBuilder {
    this.claim.claim_template_name = claimTemplateName;

    return this;
  }

  status(status: ClaimStatuses): IClaimBuilder {
    this.claim.status = status;

    return this;
  }

  priority(priority: ClaimPriorities): IClaimBuilder {
    this.claim.priority = priority;

    return this;
  }

  claim_user(claimUser: any): IClaimBuilder {
    this.claim.claim_user = claimUser;

    return this;
  }

  runtime(runtime: IRuntime): IClaimBuilder {
    this.claim.claim_user = runtime;

    return this;
  }

  attrs(attrs: any): IClaimBuilder {
    this.claim.attrs = attrs;

    return this;
  }

  rating(rating: number): IClaimBuilder {
    this.claim.rating = rating;

    return this;
  }
}
