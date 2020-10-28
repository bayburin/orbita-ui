import { EventTypeNames } from '@modules/claim/enums/event-type-names.enum.ts';

export interface IEventType {
  id: number;
  name: EventTypeNames;
  description: string;
  icon: string;
}
