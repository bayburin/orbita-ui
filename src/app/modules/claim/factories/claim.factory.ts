import { Claim } from '@modules/claim/models/claim/claim.model';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import { Work } from '@modules/claim/models/work/work.model';

export class ClaimFactory {
  static create(attrs: IClaim = { } as IClaim): Claim {
    const claim = new Claim(attrs);

    if (attrs.works) {
      claim.works = attrs.works.map(work => new Work(work));
    }

    return claim;
  }
}
