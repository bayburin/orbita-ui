import { of, Observable } from 'rxjs';

import { ITag } from '@shared/interfaces/tag.interface';

export class TagApiStub {
  getTags(): Observable<ITag[]> { return of([]); }
}
