import { decrypt, encrypt, getPublicKeyBase64 } from './crypto';

describe('utils/crypto', () => {

  it('should correctly encrypt/decrypt object', function() {
    const object = {
      emails: ['catrias@yandex.ru'],
      usernames: ['catrias'],
    };

    const key = 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e';

    const encrypted = encrypt(object, key);

    const decrypted = decrypt(encrypted, key);

    expect(JSON.stringify(object) === JSON.stringify(decrypted)).toBeTrue();
  });

  it('should generate correct publicKey base64', function() {
    const privateKeyHex = 'fbf265ca5872907c4dbd33bf87c683d84b96987eb42d4a6c50f335eac57ece3e';
    const publicKeyBase64 = getPublicKeyBase64(privateKeyHex);
    const expected = 'A2Y+oEbooAQumYeb9r7jbediO1PMITBnBDiPA5K8ClHh';

    expect(publicKeyBase64).toEqual(expected);
  });

});
