import { WorkFactory } from '@modules/claim/factories/work/work.factory';
import { RuntimeFactory } from '@modules/claim/factories/runtime/runtime.factory';
import { SdRequest } from '@modules/sd-request/models/sd-request.model';
import { ISdRequest } from '@modules/sd-request/interfaces/sd-request.interface';
import { ClaimFactoryT } from '@modules/claim/factories/claim/claim.factory.abstract';

export class SdRequestFactory extends ClaimFactoryT<SdRequest> {
  create(attrs: ISdRequest = {} as ISdRequest, optional: any = {}): SdRequest {
    const request = new SdRequest(attrs);

    request.runtime = RuntimeFactory.create(attrs.runtime);
    if (attrs.works) {
      request.works = attrs.works.map(work => WorkFactory.create(work, optional.users));
    }

    return request;
  }
}
