import * as faker from 'faker';

import { IClaimBuilder } from '@modules/claim/builders/i-claim.builder';
import { ISdRequest } from '@modules/sd-request/interfaces/sd-request.interface';
import { IWork } from '@modules/claim/interfaces/work.interface';
import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';

export class ISdRequestBuilder extends IClaimBuilder<ISdRequest> {
  constructor() {
    super();
  }

  testBuild(): ISdRequest {
    super.testBuild();

    this.model.type = ClaimTypes.SD_REQUEST;
    this.model.service_id = this.model.service_id || faker.random.number();
    this.model.app_template_id = this.model.app_template_id || faker.random.number();
    this.model.service_name = this.model.service_name || faker.random.word();
    this.model.app_template_name = this.model.app_template_name || faker.random.word();

    return this.model;
  }

  id(id: number): ISdRequestBuilder {
    this.model.id = id;

    return this;
  }

  service_id(serviceId: number): ISdRequestBuilder {
    this.model.service_id = serviceId;

    return this;
  }

  app_template_id(appTemplateId: number): ISdRequestBuilder {
    this.model.app_template_id = appTemplateId;

    return this;
  }

  service_name(serviceName: string): ISdRequestBuilder {
    this.model.service_name = serviceName;

    return this;
  }

  app_template_name(appTemplateName: string): ISdRequestBuilder {
    this.model.app_template_name = appTemplateName;

    return this;
  }

  rating(rating: number): ISdRequestBuilder {
    this.model.rating = rating;

    return this;
  }

  works(works: IWork[]): ISdRequestBuilder {
    this.model.works = works;

    return this;
  }
}
