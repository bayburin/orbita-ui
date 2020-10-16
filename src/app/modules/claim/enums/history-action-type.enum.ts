export enum HistoryActionTypes {
  ACTION = 'action',
  COMMENT = 'comment',
  ADD_WORKER = 'add_worker',
  POSTPONE = 'postpone',
  CLOSE = 'close'
}

export interface IHistoryActionTypesData {
  title: string;
  icon: string;
}

export const historyActionTypesMap: Record<HistoryActionTypes, IHistoryActionTypesData> = {
  [HistoryActionTypes.ACTION]: { title: 'Выполнено действие', icon: 'comment-check-outline' },
  [HistoryActionTypes.COMMENT]: { title: 'Добавлен комментарий', icon: 'comment-text-outline' },
  [HistoryActionTypes.ADD_WORKER]: { title: 'Подключен исполнитель', icon: 'account-plus' },
  [HistoryActionTypes.POSTPONE]: { title: 'Перенесен срок исполнения', icon: 'calendar-clock' },
  [HistoryActionTypes.CLOSE]: { title: 'Заявка закрыта', icon: 'checkbox-marked-circle-outline' },
};

export function getHistoryActionType(actionType: HistoryActionTypes): IHistoryActionTypesData {
  return HistoryActionTypes[actionType];
}
