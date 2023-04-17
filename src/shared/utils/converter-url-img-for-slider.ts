import {ImgOneBook} from '../../interfaces/interfaces';
import {baseUrl} from '../constants/url';

export const converterUrlImg = (date: ImgOneBook[]): string[] =>  date.map((img) => `${baseUrl}${img.url}`)



