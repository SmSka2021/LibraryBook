import * as yup from 'yup';
import {messageEmptyField} from '../constants/message';

export const schemaName = yup.object().shape({
    firstName: yup.string().required(messageEmptyField),
    lastName: yup.string().required(messageEmptyField),
});
