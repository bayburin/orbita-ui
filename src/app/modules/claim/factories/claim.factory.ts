import { ModelFactory } from '@shared/factories/model.factory';
import { Claim } from '@modules/claim/models/claim/claim.model';
import { IClaim } from '@modules/claim/interfaces/claim.interface';

export class ClaimFactory extends ModelFactory<Claim, IClaim> {
  constructor() {
    super(Claim);
  }
}
