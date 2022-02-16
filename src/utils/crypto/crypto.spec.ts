import {
  decodeObjectUnicode,
  encodeObjectCharactersToUnicode,
} from './crypto';

describe('utils/crypto', () => {

  it('should correctly encode object characters', () => {
    const object = {
      a: '<p>Some text & some text</p>'
    };

    const expectedObject = {
      a: '\\u003cp\\u003eSome text \\u0026 some text\\u003c/p\\u003e',
    };

    const encoded = encodeObjectCharactersToUnicode(object, ['<', '>', '&']);

    expect(JSON.stringify(encoded)).toEqual(JSON.stringify(expectedObject));
  });

  it('should correctly decode object', () => {
    const object = {
      a: '\\u003cp\\u003eSome text \\u0026 some text\\u003c/p\\u003e',
    };

    const expectedObject = {
      a: '<p>Some text & some text</p>'
    };

    const decoded = decodeObjectUnicode(object);

    expect(JSON.stringify(decoded)).toEqual(JSON.stringify(expectedObject));
  });

});
