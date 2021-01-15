import { IBaseEmployeeBuilder } from '@modules/employee/builders/i-base-employee.builder';
import * as EmployeeSelectors from './employee.selectors';

describe('EmployeeSelectors', () => {
  const ids = [1, 2];
  const entities = { 1: new IBaseEmployeeBuilder().testBuild(), 2: new IBaseEmployeeBuilder().testBuild() };
  const arrEntities = Object.values(entities).map(val => val);
  const initialState = {
    ids,
    entities,
    error: null
  };

  it('should return ids array if call getIds', () => {
    expect(EmployeeSelectors.getIds.projector(initialState)).toEqual(ids);
  });

  it('should return entities object if call getEntities', () => {
    expect(EmployeeSelectors.getEntities.projector(initialState)).toEqual(entities);
  });

  it('should return entities array if call getAll', () => {
    expect(EmployeeSelectors.getAll.projector(initialState)).toEqual(arrEntities);
  });
});
