import { ClaimFactoryT } from './claim.factory.abstract';
import { ClaimTypes } from '@modules/claim/enums/claim-types.enum';
import { SdRequestFactory } from '@modules/sd-request/factories/sd-request.factory';
import { ClaimModel } from '@modules/claim/types/claim.types';

export class ClaimInitializer {
  static for(type: ClaimTypes): ClaimFactoryT<ClaimModel> {
    switch (type) {
      case ClaimTypes.SD_REQUEST:
        return new SdRequestFactory();
      case ClaimTypes.CASE:
        throw new Error('Not implemented');
    }
  }
}
