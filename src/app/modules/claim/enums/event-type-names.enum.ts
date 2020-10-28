export enum EventTypeNames {
  WORKFLOW = 'workflow',
  COMMENT = 'comment',
  POSTPONE = 'postpone',
  CLOSE = 'close'
}

export interface IEventTypeNamesData {
  icon: string;
}

export const eventTypeNamesMap: Record<EventTypeNames, IEventTypeNamesData> = {
  [EventTypeNames.WORKFLOW]: { icon: 'comment-check-outline' },
  [EventTypeNames.COMMENT]: { icon: 'comment-text-outline' },
  [EventTypeNames.POSTPONE]: { icon: 'calendar-clock' },
  [EventTypeNames.CLOSE]: { icon: 'checkbox-marked-circle-outline' },
};

export function getEventTypeName(name: EventTypeNames): IEventTypeNamesData {
  return EventTypeNames[name];
}
