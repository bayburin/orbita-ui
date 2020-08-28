import { Action } from '@ngrx/store';

import { Claim } from '@modules/claim/models/claim/claim.model';

export enum ActionTypes {
  Select = '[Claim] Select',
  LoadAll = '[Claim] Load All',
  LoadAllSuccess = '[Claim] Load All Success',
  LoadAllFailure = '[Claim] Load All Failure'
}

export class Select implements Action {
  readonly type = ActionTypes.Select;

  constructor(public payload: number) { }
}

export class LoadAll implements Action {
  readonly type = ActionTypes.LoadAll;
}

export class LoadAllSuccess implements Action {
  readonly type = ActionTypes.LoadAllSuccess;

  // ? TODO: Нужно написать адаптер, так как с сервера данные придут в виде массива заявок, а не объекта
  constructor(public payload: { ids: number[], claims: Claim[] }) { }
}

export class LoadAllFailure implements Action {
  readonly type = ActionTypes.LoadAllFailure;

  constructor(public payload: any) { }
}

export type Actions = Select | LoadAll | LoadAllSuccess | LoadAllFailure;
