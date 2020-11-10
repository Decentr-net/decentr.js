import { generateMnemonic } from './mnemonic';

describe('mnemonic', () => {

  it('should generate 24 length mnemonic', () => {
    const words = generateMnemonic().split(' ');

    expect(words.length).toBe(24);
  });

});
