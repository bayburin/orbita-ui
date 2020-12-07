import * as moment from 'moment';

import { ISdRequestBuilder } from '@modules/sd-request/builders/i-sd-request.builder';
import * as ClaimSelectors from '@modules/claim/store/selectors/claim.selectors';

describe('ClaimSelectors', () => {
  const ids = [1, 2];
  const entities = { 1: new ISdRequestBuilder().id(1).build(), 2: new ISdRequestBuilder().id(2).build() };
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

  beforeEach(() => {
    const today = moment('2015-10-19').toDate();

    jasmine.clock().mockDate(today);
  });

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
    expect(ClaimSelectors.getEntity.projector(selected, entities)).toEqual(entities[selected]);
  });

  // it('should return array of claims if call getAllClaims', () => {
  //   expect(ClaimSelectors.getAllClaims.projector(arrEntities)).toEqual(arrEntities.map(el => ClaimFactory.create(el)));
  // });
});
