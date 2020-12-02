import { sortObjectKeys } from './object';

describe('utils/object', () => {

  it('should correctly sort object', function() {
    const object = {
      c: [3, 2, 8, 0],
      b: {
        c: {},
        a: 321,
        b: '',
      },
      a: 'cba',
    };

    const expectedObject = {
      a: 'cba',
      b: {
        a: 321,
        b: '',
        c: {},
      },
      c: [3, 2, 8, 0],
    };

    const sortedObject = sortObjectKeys(object);

    expect(JSON.stringify(expectedObject) === JSON.stringify(sortedObject))
      .toBeTrue();
  });

  it('should correctly remove undefined properties from primitive object', () => {
    const object: Partial<Record<string, string | number>> = {
      a: 3,
      b: undefined,
      c: 'abc',
    };

    const expectedObject = {
      a: 3,
      c: 'abc',
    };

    const filteredObject = sortObjectKeys(object);

    expect(JSON.stringify(expectedObject) === JSON.stringify(filteredObject))
      .toBeTrue();
  })

});
