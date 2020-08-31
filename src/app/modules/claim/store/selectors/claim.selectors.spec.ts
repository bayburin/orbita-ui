import { Claim } from '@modules/claim/models/claim/claim.model';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';

describe('ClaimSelectors', () => {
  const ids = [1, 2];
  const claims = { 1: new Claim({ id: 1, service_name: 'Test 1' }), 2: new Claim({ id: 2, service_name: 'Test 2' }) };
  const selected = 1;
  const initialState = {
    ids,
    entities: claims,
    selected,
    loading: false,
    loaded: false,
    error: null
  };

  it('should return ids array if call getIds', () => {
    expect(ClaimSelectors.getIds.projector(initialState)).toEqual(ids);
  });

  it('should return claims if call getEntities', () => {
    expect(ClaimSelectors.getEntities.projector(initialState)).toEqual(claims);
  });

  it('should return claims array if call getAll', () => {
    const result = Object.values(claims).map(val => val);

    expect(ClaimSelectors.getAll.projector(initialState)).toEqual(result);
  });

  it('should return total count of entities if call getTotalCount', () => {
    expect(ClaimSelectors.getTotalCount.projector(initialState)).toEqual(ids.length);
  });

  it('should return selected id if call getSelected', () => {
    expect(ClaimSelectors.getSelected.projector(initialState)).toEqual(selected);
  });
});
