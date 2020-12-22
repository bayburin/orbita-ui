import { oFlatMap } from './flat-map';

describe('oFlatMap', () => {
  it('should transform array to flat structure', () => {
    const arr = [[1, 2], [3, 4]];

    expect(oFlatMap(el => el, arr)).toEqual([1, 2, 3, 4]);
  });

  it('should transform array to flat structure', () => {
    const arr = [
      { foo: ['test 1'] },
      { foo: ['test 2'] }
    ];

    expect(oFlatMap(el => el.foo, arr)).toEqual(['test 1', 'test 2']);
  });
});
