import { Observable } from 'rxjs';

import { Claim } from '@modules/claim/models/claim/claim.model';

export class ClaimFacadeStub {
  claims$: Observable<Claim[]> = new Observable();

  loadClaims(): void {}
}
