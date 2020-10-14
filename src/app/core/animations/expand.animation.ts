import { animate, state, style, transition, trigger } from '@angular/animations';

export const expandAnimation = trigger('expandAnimation', [
  state('collapsed', style({ opacity: 0, height: '0px', minHeight: '0' })),
  state('expanded', style({ opacity: 1, height: '*' })),
  transition('expanded <=> collapsed', animate('100ms ease-in-out')),
]);
