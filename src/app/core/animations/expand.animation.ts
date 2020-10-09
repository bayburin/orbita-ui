import { animate, state, style, transition, trigger } from '@angular/animations';

export const expandAnimation = trigger('expandAnimation', [
  state('collapsed', style({ height: '0px', minHeight: '0' })),
  state('expanded', style({ height: '*' })),
  transition('expanded <=> collapsed', animate('100ms ease-in-out')),
]);
