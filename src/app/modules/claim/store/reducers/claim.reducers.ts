import { IClaimState, initialClaimState } from '@modules/claim/store/state/claim.state';
import { ClaimActions, EClaimActions } from '@modules/claim/store/actions/claim.actions';

export function claimReducer(state: IClaimState = initialClaimState, action: ClaimActions): IClaimState {
  switch (action.type) {
    case EClaimActions.Select:
      const id = action.payload;

      return {
        ...state,
        selected: id
      };
      default:
        return state;
  }
}
