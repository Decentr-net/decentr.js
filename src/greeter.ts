import { IS_DEV } from './environment'
import { generateMnemonic } from 'bip39';
export class Greeter {
  constructor(private greeting: string) {}
  greet() {
    return `Hello, ${this.greeting}!`
  }

  generate() {
    return generateMnemonic();
  }

  greetMe() {
    /* istanbul ignore next line */
    if (IS_DEV) {
      // tslint:disable-next-line:no-console
      console.warn('this method is deprecated, use #greet instead')
    }

    return this.greet()
  }
}
