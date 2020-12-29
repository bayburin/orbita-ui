import { IServiceBuilder } from '@modules/sd-request/builders/i-service.builder';
import * as ServiceSelectors from './service.selectors';

describe('ServiceSelectors', () => {
  const ids = [1, 2];
  const entities = { 1: new IServiceBuilder().testBuild(), 2: new IServiceBuilder().testBuild() };
  const arrEntities = Object.values(entities).map(val => val);
  const initialState = {
    ids,
    entities,
    error: null
  };

  it('should return ids array if call getIds', () => {
    expect(ServiceSelectors.getIds.projector(initialState)).toEqual(ids);
  });

  it('should return entities object if call getEntities', () => {
    expect(ServiceSelectors.getEntities.projector(initialState)).toEqual(entities);
  });

  it('should return entities array if call getAll', () => {
    expect(ServiceSelectors.getAll.projector(initialState)).toEqual(arrEntities);
  });
});
