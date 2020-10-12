import { ClaimFactory } from '@modules/claim/factories/claim.factory';
import { IClaim } from '@modules/claim/interfaces/claim.interface';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';

describe('ClaimSelectors', () => {
  const ids = [1, 2];
  const entities = { 1: { id: 1, service_name: 'Test 1' } as IClaim, 2: { id: 2, service_name: 'Test 2' } as IClaim };
  const arrEntities = Object.values(entities).map(val => val);
  const selected = 1;
  const initialState = {
    ids,
    entities,
    selected,
    loading: false,
    loaded: false,
    error: null
  };
  const factory = new ClaimFactory();

  it('should return ids array if call getIds', () => {
    expect(ClaimSelectors.getIds.projector(initialState)).toEqual(ids);
  });

  it('should return entities object if call getEntities', () => {
    expect(ClaimSelectors.getEntities.projector(initialState)).toEqual(entities);
  });

  it('should return entities array if call getAll', () => {
    expect(ClaimSelectors.getAll.projector(initialState)).toEqual(arrEntities);
  });

  it('should return total count of entities if call getTotalCount', () => {
    expect(ClaimSelectors.getTotalCount.projector(initialState)).toEqual(ids.length);
  });

  it('should return selected id if call getSelected', () => {
    expect(ClaimSelectors.getSelected.projector(initialState)).toEqual(selected);
  });

  it('should return single entity if call getEntity', () => {
    expect(ClaimSelectors.getEntityClaim.projector(selected, entities)).toEqual(factory.create(entities[selected]));
  });

  it('should return array of claims if call getAllClaims', () => {
    expect(ClaimSelectors.getAllClaims.projector(arrEntities)).toEqual(arrEntities.map(el => factory.create(el)));
  });
});
