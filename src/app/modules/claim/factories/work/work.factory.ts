import { IWork } from '@modules/claim/interfaces/work.interface';
import { Work } from '@modules/claim/models/work/work.model';
import { HistoryFactory } from '../history/history.factory';

export class WorkFactory {
  /**
   * Создает объект работы группы по заявке.
   */
  static create(attrs: IWork = { } as IWork): Work {
    const work = new Work(attrs);

    if (attrs.histories) {
      work.histories = attrs.histories.map(hist => HistoryFactory.create(hist));
    }

    return work;
  }
}
