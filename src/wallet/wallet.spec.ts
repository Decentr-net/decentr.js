import { createWalletFromMnemonic, createWalletFromPrivateKey } from './wallet';
import { Wallet } from './types';

describe('wallet', () => {

  it('should create correct wallet from mnemonic', () => {
    const mnemonic = 'word1 word2 word3 word4 word5 word6 word7 word8 ' +
      'word9 word10 word11 word12 word13 word14 word15 word16 ' +
      'word17 word18 word19 word20 word21 word22 word23 word24';

    const wallet = createWalletFromMnemonic(mnemonic);

    const expectedWallet: Wallet = {
      address: 'decentr1pkt9czt8yqnmek529s7mkde9zp5p7efw4xxh7w',
      validatorAddress: 'decentrvaloper1pkt9czt8yqnmek529s7mkde9zp5p7efw2fdmre',
      privateKey: 'e164d4bd087841e8e1928225042fc3d13dc174f25473765df5431809608bc824',
      publicKey: '02406c54ce3f5580576795686e3e1c5ce9207113843e0f9bad463c7bf566926a63'
    };

    expect(wallet.address).toEqual(expectedWallet.address);

    expect(wallet.validatorAddress).toEqual(expectedWallet.validatorAddress);

    expect(wallet.privateKey).toEqual(expectedWallet.privateKey);

    expect(wallet.publicKey).toEqual(expectedWallet.publicKey);
  });

  it('should create correct wallet from private key', async () => {
    const privateKey = 'e164d4bd087841e8e1928225042fc3d13dc174f25473765df5431809608bc824';

    const wallet = await createWalletFromPrivateKey(privateKey);

    const expectedWallet: Wallet = {
      address: 'decentr1pkt9czt8yqnmek529s7mkde9zp5p7efw4xxh7w',
      validatorAddress: 'decentrvaloper1pkt9czt8yqnmek529s7mkde9zp5p7efw2fdmre',
      privateKey,
      publicKey: '02406c54ce3f5580576795686e3e1c5ce9207113843e0f9bad463c7bf566926a63'
    };

    expect(wallet.address).toEqual(expectedWallet.address);

    expect(wallet.validatorAddress).toEqual(expectedWallet.validatorAddress);

    expect(wallet.privateKey).toEqual(expectedWallet.privateKey);

    expect(wallet.publicKey).toEqual(expectedWallet.publicKey);
  });

})
