import { ClaimModel } from '@modules/claim/types/claim.types';

export abstract class ClaimFactoryT<T extends ClaimModel> {
  abstract create(attrs: any): T;
}
