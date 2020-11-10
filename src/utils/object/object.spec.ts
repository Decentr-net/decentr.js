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

});
