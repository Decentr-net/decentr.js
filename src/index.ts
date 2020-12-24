import { getPrivateProfile } from './api'

export * from './api';
export * from './mnemonic';
export * from './wallet';

getPrivateProfile(
  'https://rest.testnet.decentr.xyz',
  'decentr1drkazqqrjqs5thh2m4eje2c3fj4ujdz6vjmzls',
  '8d398813e3bdffa3e016a5adc7df76b18e67c195ee9e2a17ad3457ced8d4227b'
).then(console.log)
