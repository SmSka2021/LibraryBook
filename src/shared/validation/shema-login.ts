import * as yup from 'yup';
import {messageEmptyField} from '../constants/message';

export const schemaLogin = yup.object().shape({
    username: yup.string()
        .required(messageEmptyField)
        .test({
            name: 'usernameErrNumberAndLetter',
            message: ' латинский алфавит и цифры!',
            test() {
                const {username} = this.parent;
                const regex1 = new RegExp(/^[a-zA-Z0-9]+$/);
                if(username.length === 1)return regex1.test(username)

                return true;
            }
        })
        .test({
            name: 'usernameErrNumber',
            message: ' цифры!',
            test() {
                const {username} = this.parent;
                if((/^[a-zA-Z0-9]+$/).test(username)) {
                    const regex = new RegExp(/^(?=.*[0-9])([a-zA-Z0-9]+)$/);

                    return regex.test(username);
                }
                const regex = new RegExp(/^(?=.*[0-9])([a-zA-Z0-9]+)$/);

                return !regex.test(username);
            }
        })
        .test({
            name: 'usernameErrLetter',
            message: 'латинский алфавит',
            test() {
                const {username} = this.parent;
                const regex = new RegExp(/^(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i);

                return regex.test(username);
            }
        }),
    password:  yup.string()
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
    })
}).required()
