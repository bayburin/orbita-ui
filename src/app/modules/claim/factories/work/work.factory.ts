import { IWork } from '@modules/claim/interfaces/work.interface';
import { Work } from '@modules/claim/models/work/work.model';
import { HistoryFactory } from '../history/history.factory';
import { IUser } from '@modules/user/interfaces/user.interface';

export class WorkFactory {
  /**
   * Создает объект работы группы по заявке.
   */
  static create(attrs: IWork = { } as IWork, users: IUser[] = []): Work {
    const work = new Work(attrs);

    if (attrs.histories) {
      work.histories = attrs.histories.map(hist => HistoryFactory.create(hist));
    }
    if (attrs.workers) {
      work.workers = attrs.workers.map(worker => users.find(u => u.id === worker.user_id));
    }

    return work;
  }
}
