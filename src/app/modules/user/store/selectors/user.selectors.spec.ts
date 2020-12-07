import * as moment from 'moment';

import { IUserBuilder } from '@modules/user/builders/i-user.builder';
import * as UserSelectors from '@modules/user/store/selectors/user.selectors';

describe('UserSelectors', () => {
  const ids = [1, 2];
  const entities = { 1: new IUserBuilder().id(1).testBuild(), 2: new IUserBuilder().id(2).testBuild() };
  const arrEntities = Object.values(entities).map(val => val);
  const selected = 1;
  const initialState = {
    ids,
    entities,
    selected,
    error: null
  };

  beforeEach(() => {
    const today = moment('2015-10-19').toDate();

    jasmine.clock().mockDate(today);
  });

  it('should return ids array if call getIds', () => {
    expect(UserSelectors.getIds.projector(initialState)).toEqual(ids);
  });

  it('should return entities object if call getEntities', () => {
    expect(UserSelectors.getEntities.projector(initialState)).toEqual(entities);
  });

  it('should return entities array if call getAll', () => {
    expect(UserSelectors.getAll.projector(initialState)).toEqual(arrEntities);
  });

  it('should return total count of entities if call getTotalCount', () => {
    expect(UserSelectors.getTotalCount.projector(initialState)).toEqual(ids.length);
  });

  it('should return selected id if call getSelected', () => {
    expect(UserSelectors.getSelected.projector(initialState)).toEqual(selected);
  });
});
