import { IHistory } from '@modules/claim/interfaces/history.interface';
import { History } from '@modules/claim/models/history/history.model';

export class HistoryFactory {
  /**
   * Создает объект истории заявки.
   */
  static create(attrs: IHistory = { } as IHistory): History {
    return new History(attrs);
  }
}
