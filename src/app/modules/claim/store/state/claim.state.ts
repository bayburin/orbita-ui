import { IClaim } from '@modules/claim/interfaces/claim.interface';

export interface IClaimState {
  ids: number[];
  claims: { [id: number]: IClaim };
  selected: number;
}

export const initialClaimState: IClaimState = {
  ids: [],
  claims: { },
  selected: null
};
