import {decrypted, encrypted} from './cripto-data';

export const saveLocalStorage = (name: string, str: string) => {
   localStorage.setItem(name, encrypted(str))
}
export const getLocalStorage = (name: string): string | null=> {
    const item = localStorage.getItem(name);

    if(item)  return decrypted(item);

    return null;
}
export const saveLocalStorageStr = (name: string, str: string) => {
    localStorage.setItem(name, str)
}
export const isJwt = (): boolean => typeof localStorage.getItem('jwt') === 'string';
export const isAuth = (): boolean => localStorage.getItem('auth') === 'true';
