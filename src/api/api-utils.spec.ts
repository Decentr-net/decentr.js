import { getSignature } from '../utils';
import { bytesToHex } from '../utils';

describe('api-utils', () => {

  it('should create correct signature', () => {
    const targetToSign = `/v1/pdv/9664d0817131a2ce56f18d37f3836d6b6ec7cf29-e279e84f43ef47ef6e6069fea2f677ad0727299dc9fb9bab368c2196db496ca2`;

    const privateKey = 'e164d4bd087841e8e1928225042fc3d13dc174f25473765df5431809608bc824';

    const signatureHex = bytesToHex(getSignature(targetToSign, privateKey));

    const expectedSignatureHex = 'e35f0735cd3d7530db7b105c4824df4c2d982daca7a2b9c0fb86c0aaa440fffd69df4d14aebdc1a627aabc19b302fa30322474849231a9e71a6dd46be0789c5d';

    expect(signatureHex).toEqual(expectedSignatureHex);
  });

});
