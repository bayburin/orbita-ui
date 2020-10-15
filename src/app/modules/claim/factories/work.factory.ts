import { IWork } from '@modules/claim/interfaces/work.interface';
import { Work } from '@modules/claim/models/work/work.model';

export class WorkFactory {
  static create(attrs: IWork = { } as IWork): Work {
    return new Work(attrs);
  }
}
