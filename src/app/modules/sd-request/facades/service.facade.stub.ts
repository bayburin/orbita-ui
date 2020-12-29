import { Observable, BehaviorSubject } from 'rxjs';

import { IService } from '@modules/sd-request/interfaces/service.interface';

export class ServiceFacadeStub {
  services$: Observable<IService[]> = new BehaviorSubject([]);

  loadServices(): void { }
}
