import {operatorBlr, patternMobileNumber} from '../constants/mobile-operator';

 export const validatePhone = (str: string): boolean => {
    const arr = Array.from(str).filter((char)=> !Number.isNaN(+char) && char !== ' ');

    return (operatorBlr.has(str.slice(6,8)) && patternMobileNumber.test(str) && arr.length === 12);
}




