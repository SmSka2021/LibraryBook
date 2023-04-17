import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import st from './registration-steps.module.css';
import {InputTypesRegistration} from '../../interfaces/interfaces';
import {schemaLogin} from '../../shared/validation/shema-login';
import eyeClosed from '../../assets/icon/EyeClosed.svg';
import eyeOpen from '../../assets/icon/Icon_Action.svg';
import okIcon from '../../assets/icon/CheckCircle.svg';
import linkIcon from '../../assets/icon/Icon_Chevron.svg';
import {
    setStepsRegistration,
    setUserName,
    setUserPassword
} from '../../store/reducers/user-data-reducer';
import {
    messageEmptyField,
    messageFieldLogin,
    messageFieldPassword
} from '../../shared/constants/message';


export const RegistrationStep1 = () => {
    const [isFocusName, setIsFocusName] = useState(false);
    const [isFocusPassword, setIsFocusPassword] = useState(false);
    const [isChangeInputName, setIsChangeInputName] = useState(false);
    const [isChangeInputPassword, setIsChangeInputPassword] = useState(false)
    const [passwordInputType, setPasswordInputType] = useState('password');

    const dispatch = useDispatch();
    const {
        register,
        reset,
        getValues,
        getFieldState,
        formState: {errors, isDirty, isValid},
    } = useForm<InputTypesRegistration>({
        resolver: yupResolver(schemaLogin),
        mode: 'onChange',
    });
    const conditionEmptyNameFocus = isChangeInputName && isFocusName && getValues('username') === '';
    const conditionEmptyName = isChangeInputName && !isFocusName && getValues('username') === '';
    const conditionEmptyPassword = isChangeInputPassword && !isFocusPassword && getValues('password') === '';

    const changeInput = (inputName: string) => {
        if (inputName === 'password') {
            setIsChangeInputPassword(true);
            setIsFocusPassword(true);
        } else {
            setIsChangeInputName(true);
            setIsFocusName(true)
        }
    }
    const changeTypeInputPassword = () => {
        if (passwordInputType === 'password') {
            setPasswordInputType('text');

            return;
        }
        setPasswordInputType('password');
    };

    const nextStep = () => {
        if (isDirty && isValid) {
            dispatch(setUserName({username: getValues('username')}));
            dispatch(setUserPassword({password: getValues('password')}));
            dispatch(setStepsRegistration({step:'2'}));
            reset();
        }
    }

    return (
        <form className={st.innerContainer} data-test-id='register-form'>
            <div className={st.form__group}>
                <input id='inputName'
                       placeholder=' '
                       className={`${st.input} ${errors.username && st.input__error}`}
                       type='text'
                       onFocus={() => changeInput('username')}
                       {...register('username', {onBlur: () => setIsFocusName(false)})}
                />
                <label htmlFor='inputName' className={st.form__group_label}>Придумайте логин для
                    входа</label>
                {isFocusName && errors.username?.type === 'usernameErrNumberAndLetter' &&
                    <p data-test-id='hint' className={st.error__message}>
                        Используйте для логина <span className={st.error}>латинский алфавит </span>
                        и <span className={st.error}>цифры</span></p>}
                {isFocusName && errors.username?.type === 'usernameErrNumber' &&
                    <p data-test-id='hint' className={st.error__message}>Используйте для логина латинский алфавит
                        и <span className={st.error}>{errors.username.message}</span></p>}
                {isFocusName && errors.username?.type === 'usernameErrLetter' &&
                    <p data-test-id='hint' className={st.error__message}>Используйте для логина <span
                        className={st.error}>{errors.username.message}</span><span className={st.error__message}> и цифры</span></p>}
                {!errors.username && !conditionEmptyName && !isFocusName &&
                    <span data-test-id='hint' className={st.error__message}>{messageFieldLogin}</span>}
                {conditionEmptyNameFocus &&
                    <span data-test-id='hint' className={st.error__message}>{messageFieldLogin}</span>}
                {!errors.username && isChangeInputName && isFocusName && getValues('username') !== '' &&
                    <span data-test-id='hint' className={st.error__message}>{messageFieldLogin}</span>}
                {conditionEmptyName  &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}
                {errors.username && errors.username?.type !== 'required' && !isFocusName &&
                    <span data-test-id='hint' className={st.error}>{messageFieldLogin}</span>}
            </div>
            <div className={`${st.input__group_password}  ${st.form__group}`}>
                <input
                    id='inputPassword'
                    placeholder=' '
                    className={`${st.input}  ${errors.password && st.input__error}`}
                    type={passwordInputType}
                    onFocus={() => changeInput('password')}
                    {...register('password', {onBlur: () => setIsFocusPassword(false)})}
                />
                <label htmlFor='inputPassword' className={st.form__group_label}>Пароль</label>
                {!errors.password && !conditionEmptyPassword &&
                    <span data-test-id='hint' className={st.error__message}>{messageFieldPassword}</span>}
                {isFocusPassword && errors.password?.type === 'passwordErrLength' &&
                    <p data-test-id='hint' className={st.error__message}>Пароль <span
                        className={st.error}>{errors.password.message}</span><span className={st.error__message}>, c заглавной
                        буквой и цифрой</span></p>}
                {isFocusPassword && errors.password?.type === 'passwordErrLengthAndNumber' &&
                    <p data-test-id='hint' className={st.error__message}>Пароль <span className={st.error}>не менее 8 символов</span>,
                        <span className={st.error__message}>с заглавной буквой и</span><span className={st.error}>цифрой</span></p>}
                {isFocusPassword && errors.password?.type === 'passwordErrLengthAndBigLetter' &&
                    <p data-test-id='hint' className={st.error__message}>Пароль <span className={st.error}>не менее 8 символов</span>,
                        с <span className={st.error}>заглавной буквой</span> и <span className={st.error__message}>цифрой</span></p>}
                {isFocusPassword && errors.password?.type === 'passwordErrLengthAndBigLetterAndNumber' &&
                    <p data-test-id='hint' className={st.error__message}>Пароль <span className={st.error}>не менее 8 символов</span>,
                        с <span className={st.error}>заглавной буквой</span> и <span
                            className={st.error}>цифрой</span></p>}
                {conditionEmptyPassword  &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}
                {errors.password && !isFocusPassword && errors.password?.type !== 'required' &&
                    <span data-test-id='hint' className={st.error}>{messageFieldPassword}</span>}
                {isChangeInputPassword  && <button type='button'
                        data-test-id={passwordInputType === 'password' ? 'eye-closed' : 'eye-opened'}
                        className={st.password__btn_eye}
                        onClick={changeTypeInputPassword}>
                    <img src={passwordInputType === 'password' ? eyeClosed : eyeOpen}
                         alt='icon'/>
                </button>}
                {!errors?.password && getFieldState('password').isDirty && <img data-test-id='checkmark' src={okIcon} className={st.okIcon} alt='icon'/>}
            </div>
            <button className={st.form__btn_submit} type='button' disabled={!isDirty || !isValid}
                    onClick={nextStep}>Следующий шаг
            </button>
            <div className={st.container__link}>
                <p className={st.container__link_ask}>Есть учётная запись?</p>
                <Link className={st.container__link_item} to='/auth'><span>войти</span><img
                    src={linkIcon} alt='icon'/></Link>
            </div>
        </form>
    );
}
