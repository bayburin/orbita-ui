import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';
import { Claim } from '@modules/claim/models/claim/claim.model';
import { ISdRequest } from '@modules/sd-request/interfaces/sd-request.interface';

export class SdRequest extends Claim {
  readonly type = ClaimTypes.SD_REQUEST;
  serviceId: number;
  claimTemplateId: number;
  serviceName: string;
  claimTemplateName: string;
  rating: number;

  constructor(request: ISdRequest) {
    super(request);

    this.serviceId = request.service_id;
    this.claimTemplateId = request.claim_template_id;
    this.serviceName = request.service_name;
    this.claimTemplateName = request.claim_template_name;
    this.rating = request.rating;
  }
}
