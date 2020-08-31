import { Claim } from '@modules/claim/models/claim/claim.model';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';

describe('ClaimSelectors', () => {
  const ids = [1, 2];
  const claims = { 1: new Claim({ id: 1, service_name: 'Test 1' }), 2: new Claim({ id: 2, service_name: 'Test 2' }) };
  const selected = 1;
  const initialState = {
    ids,
    claims,
    selected,
    loading: false,
    loaded: false,
    error: null
  };

  it('should return ids array if call getIds', () => {
    expect(ClaimSelectors.getIds.projector(initialState)).toEqual(ids);
  });

  it('should return claims if call getClaims', () => {
    expect(ClaimSelectors.getClaims.projector(initialState)).toEqual(claims);
  });

  it('should return selected id if call selected', () => {
    expect(ClaimSelectors.getSelected.projector(initialState)).toEqual(selected);
  });

  it('should return claims array if call getClaimsArray', () => {
    const result = Object.values(claims).map(val => val);

    expect(ClaimSelectors.getClaimsArray.projector(ids, claims)).toEqual(result);
  });
});
