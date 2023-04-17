// eslint-disable-next-line import/no-extraneous-dependencies
import SimpleCrypto from 'simple-crypto-js';

const secretKey = 'some-unique-key';
const simpleCrypto = new SimpleCrypto(secretKey);

export const encrypted = (str:string) =>  simpleCrypto.encrypt(str);

export const decrypted = (str:string) =>  simpleCrypto.decrypt(str);





