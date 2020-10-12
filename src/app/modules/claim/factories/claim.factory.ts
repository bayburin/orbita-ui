import { ModelFactory } from '@shared/factories/model.factory';
import { Claim } from '@modules/claim/models/claim/claim.model';

export class ClaimFactory extends ModelFactory<Claim> {
  constructor() {
    super(Claim);
  }
}
