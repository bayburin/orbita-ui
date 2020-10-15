import { Claim } from '@modules/claim/models/claim/claim.model';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { Work } from '@modules/claim/models/work/work.model';
import { Runtime } from '../models/claim/runtime.model';

export class ClaimFactory {
  /**
   * Создает объект заявки.
   */
  static create(attrs: IClaim = { } as IClaim): Claim {
    const claim = new Claim(attrs);

    claim.runtime = new Runtime(attrs.runtime);
    if (attrs.works) {
      claim.works = attrs.works.map(work => new Work(work));
    }

    return claim;
  }
}
