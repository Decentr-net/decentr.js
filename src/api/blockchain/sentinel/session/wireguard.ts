import { bufferToBytes } from '@tendermint/belt';
import { generateKeyPair } from 'curve25519-js';
import { Address4, Address6 } from 'ip-address';

import { getWebCryptoRandomBytesBuffer } from '../../../../mnemonic';
import { Base64ToBytes, bytesToString, getAuthHeaders } from '../../../../utils';
import { KeyPair, Wallet } from '../../../../wallet';
import { Session } from '../../../../codec/sentinel/session/v1/session';

export interface AddSessionResponse {
  ipV4: string;
  ipV6: string;
  host: string;
  port: number;
  hostPublicKey: string;
}

export const generateKeys = (): KeyPair => {
  const wgKeyPair = generateKeyPair(bufferToBytes(getWebCryptoRandomBytesBuffer()));

  const privateKey = bytesToString(wgKeyPair.private, 'base64');
  const publicKey = bytesToString(wgKeyPair.public, 'base64');

  return { privateKey, publicKey };
};

export const getSessionSignature = (
  sessionId: Session['id'],
  privateKey: Wallet['privateKey'],
): string => {
  const sessionBytes = new Uint8Array(sessionId.toBytesBE());

  return getAuthHeaders(
    sessionBytes,
    privateKey,
    {
      signatureEncoding: 'base64',
    },
  ).Signature;
}

export const parseAddSessionResponse = (response: string): AddSessionResponse  => {
  enum AddSessionPartLength {
    IpV4 = 4,
    IpV6 = 16,
    Host = 4,
    Port = 2,
    HostPublicKey = 32,
  }

  const responseBytes = Base64ToBytes.decode(response);

  let offset = 0;

  const ipV4Bytes = responseBytes.slice(offset, offset += AddSessionPartLength.IpV4);
  const ipV4 = Address4.fromHex(bytesToString(ipV4Bytes, 'hex')).address;

  const ipV6Bytes = responseBytes.slice(offset, offset += AddSessionPartLength.IpV6);
  const ipV6 = Address6.fromByteArray([...ipV6Bytes.values()]).address;

  const hostBytes = responseBytes.slice(offset, offset += AddSessionPartLength.Host);
  const host = Address4.fromHex(bytesToString(hostBytes, 'hex')).address;

  const portBytes = responseBytes.slice(offset, offset += AddSessionPartLength.Port);
  const port = Buffer.from(portBytes).readUint16BE();

  const hostPublicKeyBytes = responseBytes.slice(offset, offset += AddSessionPartLength.HostPublicKey);
  const hostPublicKey = bytesToString(hostPublicKeyBytes, 'base64');

  return {
    ipV4,
    ipV6,
    host,
    port,
    hostPublicKey,
  };
};
