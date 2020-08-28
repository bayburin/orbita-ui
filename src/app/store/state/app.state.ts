import { initialClaimState } from '@modules/claim/store/state/claim.state';
import { IClaimState } from '@modules/claim/store/state/claim.state';

export interface IAppState {
  claims: IClaimState;
}

export const initialAppState: IAppState = {
  claims: initialClaimState
};
