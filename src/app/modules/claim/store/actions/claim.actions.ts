import { Action } from '@ngrx/store';

export enum EClaimActions {
  Select = '[Claim] Select'
}

export class Select implements Action {
  readonly type = EClaimActions.Select;

  constructor(public payload: number) { }
}

export type ClaimActions = Select;
