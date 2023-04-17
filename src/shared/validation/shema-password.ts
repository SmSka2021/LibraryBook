import * as yup from 'yup';
import {messageEmptyField} from '../constants/message';

export const schemaPassword = yup.object().shape({

    password: yup.string()
        .required(messageEmptyField)
        .test({
            name: 'passwordErrLength',
            message: 'не менее 8 символов',
            test() {
                const {password} = this.parent;
                const regex = new RegExp(/^(?=.*[A-ZА-Я])(?=.*\d).{0,7}$/);
                return !regex.test(password)
            }
        })
        .test({
            name: 'passwordErrLengthAndNumber',
            message: '',
            test() {
                const {password} = this.parent;
                const regex = new RegExp(/^(?=.*[A-ZА-Я]).{0,7}$/);
                return !regex.test(password)
            }
        })
        .test({
            name: 'passwordErrLengthAndBigLetter',
            message: '',
            test() {
                const {password} = this.parent;
                const regex = new RegExp(/^(?=.*[0-9]).{0,7}$/);
                return !regex.test(password)
            }
        })
        .test({
            name: 'passwordErrLengthAndBigLetterAndNumber',
            message: '',
            test() {
                const {password} = this.parent;
                const regex = new RegExp(/^(?=.*[A-ZА-Я])(?=.*\d).{8,}$/);
                return regex.test(password)
            }
        }),
}).required()
