import { Observable, of } from 'rxjs';

import { ISvtItem } from '@modules/sd-request/interfaces/svt-item.interface';

export class SvtApiStub {
  getUserItems(): Observable<ISvtItem[]> { return of([]); }
}
