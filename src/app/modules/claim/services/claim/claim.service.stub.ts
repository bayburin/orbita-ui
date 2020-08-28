import { of, Observable } from 'rxjs';

import { IClaim } from '@modules/claim/interfaces/claim.interface';

export class ClaimServiceStub {
  getClaims(): Observable<IClaim[]> { return of([]); }
}
