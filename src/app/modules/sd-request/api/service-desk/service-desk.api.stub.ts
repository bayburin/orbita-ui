import { Observable, of } from 'rxjs';

import { IService } from '@modules/sd-request/interfaces/service.interface';

export class ServiceDeskApiStub {
  getServices(): Observable<IService[]> { return of([]); }
}
