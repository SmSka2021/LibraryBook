import * as yup from 'yup';
import {messageEmptyField} from '../constants/message';

export const schemaAuth = yup.object().shape({
    identifier: yup.string().required(messageEmptyField),
    password: yup.string().required(messageEmptyField),
 }).required()
