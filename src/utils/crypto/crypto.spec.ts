import {
  decodeObjectUnicode,
  encodeObjectCharactersToUnicode,
  getPublicKeyBase64,
} from './crypto';

describe('utils/crypto', () => {

  it('should generate correct publicKey base64', function() {
    const privateKeyHex = 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e';
    const publicKeyBase64 = getPublicKeyBase64(privateKeyHex);
    const expected = 'A2Y+oEbooAQumYeb9r7jbediO1PMITBnBDiPA5K8ClHh';

    expect(publicKeyBase64).toEqual(expected);
  });

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
