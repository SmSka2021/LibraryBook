import * as yup from 'yup';
import {messageEmptyField} from '../constants/message';


export const schemaEmail = yup.object().shape({

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
        })
})




