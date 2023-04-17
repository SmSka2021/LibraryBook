import * as yup from 'yup';
import {messageEmptyField} from '../constants/message';

export const schemaAll = yup.object().shape({
    // firstName: yup.string().required(messageEmptyField),
    // lastName: yup.string().required(messageEmptyField),
    email: yup.string()
        .required(messageEmptyField)
        .test({
            name: 'emailError',
            message: 'Введите корректный e-mail',
            test() {
                const {email} = this.parent;
                const regex = new RegExp(
                    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i)

                return regex.test(email)
            }
        }),
    login: yup.string()
        .required(messageEmptyField)
        .test({
            name: 'usernameErrNumberAndLetter',
            message: ' латинский алфавит и цифры!',
            test() {
                const {login} = this.parent;
                const regex1 = new RegExp(/^[a-zA-Z0-9]+$/);
                if(login && login.length === 1)return regex1.test(login)

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
})
