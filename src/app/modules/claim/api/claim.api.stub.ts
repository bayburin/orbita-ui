import { of, Observable } from 'rxjs';

import { IClaim } from '@modules/claim/interfaces/claim.interface';

export class ClaimApiStub {
  getClaims(): Observable<IClaim[]> { return of([]); }
}
