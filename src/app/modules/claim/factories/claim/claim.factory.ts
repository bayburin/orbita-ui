import { Claim } from '@modules/claim/models/claim/claim.model';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { RuntimeFactory } from '@modules/claim/factories/runtime/runtime.factory';
import { WorkFactory } from '@modules/claim/factories/work/work.factory';
import { IUser } from '@modules/user/interfaces/user.interface';

export class ClaimFactory {
  /**
   * Создает объект заявки.
   */
  static create(attrs: IClaim = { } as IClaim, users: IUser[] = []): Claim {
    const claim = new Claim(attrs);

    claim.runtime = RuntimeFactory.create(attrs.runtime);
    if (attrs.works) {
      claim.works = attrs.works.map(work => WorkFactory.create(work, users));
    }

    return claim;
  }
}
