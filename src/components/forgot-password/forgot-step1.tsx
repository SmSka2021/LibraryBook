import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import st from './forgot.module.css';
import {InputTypesRegistration} from '../../interfaces/interfaces';
import linkIcon from '../../assets/icon/Icon_Chevron.svg';
import {setUserEmail} from '../../store/reducers/user-data-reducer';
import {useAppDispatch} from '../../store/store';
import {schemaEmail} from '../../shared/validation/shema-email';
import {fetchNewPassword} from '../../store/thunks/new-password-thunk';
import {messageEmptyField} from '../../shared/constants/message';
import {
    isErrorFetchPasswordSelector,
    messageErrorPasswordSelector
} from '../../store/selectors/user-state-selectors';
import {useAppSelector} from '../../store/selectors/hook';




export const ForgotStep1 = () => {
    const [isFocusEmail, setIsFocusEmail] = useState(false);
    const [isChangeInputEmail, setIsChangeInputEmail] = useState(false);
    const isErrorFetchPassword = useAppSelector(isErrorFetchPasswordSelector)
    const messageErrorPassword = useAppSelector(messageErrorPasswordSelector)
    const dispatchApi = useAppDispatch();
    const dispatch = useDispatch();
    const {
        register,
        reset,
        getValues,
        formState: {errors, isDirty, isValid},
    } = useForm<InputTypesRegistration>({
        resolver: yupResolver(schemaEmail),
        mode: 'onChange',
    });

    const conditionEmptyEmail = isChangeInputEmail && !isFocusEmail && getValues('email') === '';
    const changeInput = () => {
             setIsChangeInputEmail(true);
            setIsFocusEmail(true);
    }

    const nextStep = async() => {
        if (isDirty && isValid) {
            const emailUser = getValues('email') as string;

            await dispatch(setUserEmail({email: emailUser}));
            dispatchApi(fetchNewPassword({email: emailUser}));
            reset();
        }
    }


    return (
        <form className={st.innerContainer} data-test-id='send-email-form'>
            <div className={st.form__group}>
                <input
                    id='emailFiled'
                    type='text'
                    placeholder=' '
                    className={`${st.input}  ${errors.email && st.input__error}`}
                    onFocus={changeInput}
                    {...register('email', {onBlur: () => setIsFocusEmail(false)})}
                />
                <label htmlFor='emailFiled' className={st.form__group_label}>E-mail</label>
                {conditionEmptyEmail &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}
                {errors.email && errors.email?.type === 'emailError' &&
                    <span className={st.error} data-test-id='hint'>{errors?.email.message}</span>}
                {isErrorFetchPassword &&  <span className={st.error} data-test-id='hint'>{messageErrorPassword}</span>}
            </div>
            <p className={st.form__message}>На это email будет отправлено письмо с инструкциями по восстановлению пароля</p>
            <button className={st.form__btn_submit} type='button' disabled={!isDirty || !isValid}
                    onClick={nextStep}>Восстановить
            </button>
            <div className={st.container__link}>
                <p className={st.container__link_ask}>Нет учётной записи?</p>
                <Link className={st.container__link_item} to='/registration'><span>регистрация</span><img
                    src={linkIcon} alt='icon'/></Link>
            </div>
        </form>
    );
}
