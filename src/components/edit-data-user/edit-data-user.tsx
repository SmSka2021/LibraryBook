
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputMask} from 'primereact/inputmask';
import {boolean} from "yup";
import st from './edit-data-user.module.css';
import {
    InputTypesRegistration,
    InputTypesUpdateUser,
    UserDataRegistration
} from '../../interfaces/interfaces';
import eyeClosed from '../../assets/icon/EyeClosed.svg';
import eyeOpen from '../../assets/icon/Icon_Action.svg';
import okIcon from '../../assets/icon/CheckCircle.svg';
import {schemaAll} from '../../shared/validation/all-field';
import {
    messageEmptyField,
    messageFieldLogin,
    messageFieldPassword, messageFormatPhone
} from '../../shared/constants/message';

import {validatePhone} from '../../shared/validation/shema-phone';
import {useAppSelector} from '../../store/selectors/hook';
import {
    idUserSelector,
    passwordUserSelector,
    profileUserSelector
} from '../../store/selectors/user-state-selectors';
import {getLocalStorage} from "../../shared/utils/save-local-storage";
import {useAppDispatch} from "../../store/store";
import {fetchEditDataUser} from "../../store/thunks/edit-data-user-thunk";





export const EditDataUser = () => {
    const dataPassword =  useAppSelector(passwordUserSelector);
    const dataPasswordUser = getLocalStorage('password') || dataPassword || '7HggFF565ffg';
    const dataUser = useAppSelector(profileUserSelector);
    const {
        register,
        reset,
        getValues,
        getFieldState,
        formState: {errors, isDirty, isValid},
    } = useForm<InputTypesUpdateUser>({
        resolver: yupResolver(schemaAll),
        mode: 'onChange',
        defaultValues: {
            login: dataUser?.username || '',
            lastName: dataUser?.lastName || '',
            firstName: dataUser?.firstName || '',
            email: dataUser?.email || '',
            password: dataPasswordUser || '',
        }
    });


    const [isFocusName, setIsFocusName] = useState(false);
    const [isFocusPassword, setIsFocusPassword] = useState(false);
    const [isFocusFirstName, setIsFocusFirstName] = useState(false);
    const [isFocusLastName, setIsFocusLastName] = useState(false);
    const [isFocusPhone, setIsFocusPhone] = useState(false);
    const [isFocusEmail, setIsFocusEmail] = useState(false);

    const [passwordInputType, setPasswordInputType] = useState('password');

    const [itemPhone, setItemPhone] = useState(dataUser?.phone as string || '+375 (33) 648-48-78');
    const idUser = useAppSelector(idUserSelector);
    const [isChangeInputFirstName, setIsChangeInputFirstName] = useState(false);
    const [isChangeInputLastName, setIsChangeInputLastName] = useState(false);
    const [isChangeInputPhone, setIsChangeInputPhone] = useState(false);
    const [isChangeInputEmail, setIsChangeInputEmail] = useState(false);
    const [isChangeInputName, setIsChangeInputName] = useState(false);
    const [isChangeInputPassword, setIsChangeInputPassword] = useState(false);

    const conditionEmptyNameFocus = isChangeInputName && isFocusName && getValues('login') === '';
    const conditionEmptyName = isChangeInputName && !isFocusName && getValues('login') === '';
    const conditionEmptyPassword = isChangeInputPassword && !isFocusPassword && getValues('password') === '';

    const [isAllFieldDisabled, setAllFieldDisabled] = useState<boolean>(true);

    const conditionEmptyFirstName = isChangeInputFirstName && !isFocusFirstName && getValues('firstName') === '';
    const conditionEmptyLastName = isChangeInputLastName && !isFocusLastName && getValues('lastName') === '';
    const conditionErrorPhone = (!isFocusPhone && isChangeInputPhone && itemPhone === '') || (!validatePhone(itemPhone) && isChangeInputPhone);
    const conditionEmptyEmail = isChangeInputEmail && !isFocusEmail && getValues('email') === '';
    const dispatch = useDispatch();
    const dispatchApi = useAppDispatch();
    const changeTypeInputPassword = () => {
        if (passwordInputType === 'password') {
            setPasswordInputType('text');

            return;
        }
        setPasswordInputType('password');
    };

    const changeInputPhone = (str: string) => {
        setIsChangeInputPhone(true);
        setItemPhone(str);
    }

    const changeInput = (str: string) => {
        switch (str) {
            case 'email':
                setIsChangeInputEmail(true);
                setIsFocusEmail(true);
                break;
            case 'firstName':
                setIsChangeInputFirstName(true);
                setIsFocusFirstName(true);
                break;
            case 'password':
                setIsChangeInputPassword(true);
                setIsFocusPassword(true);
                break;
            case 'lastName':
                setIsChangeInputLastName(true);
                setIsFocusLastName (true);
                break;
            case 'login':
                setIsChangeInputName(true);
                setIsFocusName(true);
                break;
        }
    }

    const saveEditDataUser =() => {

        if (isValid && validatePhone(itemPhone)) {
            const item = {
                fetchData: {
                    username: getValues('login') as string,
                    email: getValues('email') as string,
                    password: getValues('password') as string,
                    firstName: getValues('firstName') as string,
                    lastName: getValues('lastName') as string,
                    phone: itemPhone,
                },
                userId: idUser ? `${idUser}` : getLocalStorage('idUser') as string,
                }
          dispatchApi(fetchEditDataUser(item));
            reset();
        }
    }


    return (
        <form className={st.innerContainer} data-test-id='profile-form'>
            <div className={st.container__form}>


            <div className={st.container_1}>
                <div className={st.form__group}>
                    <input id='inputName'

                           placeholder=' '
                           className={`${st.input} ${errors.login && st.input__error}`}
                           type='text'
                           onFocus={() => changeInput('login')}
                           {...register('login', {onBlur: () => setIsFocusName(false),  disabled:isAllFieldDisabled})}
                    />
                    <label htmlFor='inputName' className={st.form__group_label}>Логин</label>
                    {isFocusName && errors.login?.type === 'usernameErrNumberAndLetter' &&
                        <p data-test-id='hint' className={st.error__message}>
                            Используйте для логина <span className={st.error}>латинский алфавит </span>
                            и <span className={st.error}>цифры</span></p>}
                    {isFocusName && errors.login?.type === 'usernameErrNumber' &&
                        <p data-test-id='hint' className={st.error__message}>Используйте для логина латинский алфавит
                            и <span className={st.error}>{errors.login.message}</span></p>}
                    {isFocusName && errors.login?.type === 'usernameErrLetter' &&
                        <p data-test-id='hint' className={st.error__message}>Используйте для логина <span
                            className={st.error}>{errors.login.message}</span><span className={st.error__message}> и цифры</span></p>}

                    {conditionEmptyNameFocus &&
                        <span data-test-id='hint' className={st.error__message}>{messageFieldLogin}</span>}
                    {!errors.login && isChangeInputName && isFocusName && getValues('login') !== '' &&
                        <span data-test-id='hint' className={st.error__message}>{messageFieldLogin}</span>}
                    {conditionEmptyName  &&
                        <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}
                    {errors.login && errors.login?.type !== 'required' && !isFocusName &&
                        <span data-test-id='hint' className={st.error}>{messageFieldLogin}</span>}
                </div>

                <div className={st.form__group}>
                    <input id='firstName'
                           placeholder=' '
                           className={`${st.input} ${errors.firstName && st.input__error}`}
                           type='text'
                           onFocus={() => changeInput('firstName')}
                           {...register('firstName', {onBlur: () => setIsFocusFirstName(false), disabled:isAllFieldDisabled})}
                    />
                    <label htmlFor='firstName' className={st.form__group_label}>Имя</label>

                </div>
                <div className={st.form__group}>
                    <InputMask
                        disabled={isAllFieldDisabled}
                        value={itemPhone}
                        onChange={(e) => changeInputPhone(e.target.value as string)}
                        mask='+375 (99) 999-99-99'
                        slotChar = 'x'
                        id='phone'
                        type='tel'
                        required={true}
                        autoClear={false}
                        placeholder=' '
                        className={`${st.input} ${conditionErrorPhone && st.input__error}`}
                        onFocus={() => setIsFocusPhone(true)}
                        name='phone'
                        onBlur={() => setIsFocusPhone(false)}
                    />
                    <label htmlFor='phone' className={st.form__group_label}>Номер телефона</label>

                    {isFocusPhone && <span data-test-id='hint' className={st.error__message}>{messageFormatPhone}</span>}
                    {isChangeInputPhone && !validatePhone(itemPhone) && !isFocusPhone && itemPhone !== '' &&
                        <span data-test-id='hint' className={st.error}>{messageFormatPhone}</span>}
                </div>
            </div>
            <div className={st.container_2}>


                <div className={`${st.input__group_password}  ${st.form__group}`}>
                    <input

                        id='inputPassword'
                        placeholder=' '
                        className={`${st.input}  ${errors.password && st.input__error}`}
                        type={passwordInputType}
                        onFocus={() => changeInput('password')}
                        {...register('password', {onBlur: () => setIsFocusPassword(false), disabled:isAllFieldDisabled})}
                    />
                    <label htmlFor='inputPassword' className={st.form__group_label}>Пароль</label>

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

                <div className={`${st.input__group_lastname}  ${st.form__group}`}>
                    <input
                        id='lastName'
                        placeholder=' '
                        className={`${st.input}  ${errors.lastName && st.input__error}`}
                        type='text'
                        onFocus={() => changeInput('lastName')}
                        {...register('lastName', {onBlur: () => setIsFocusLastName(false), disabled:isAllFieldDisabled})}
                    />
                    <label htmlFor='lastName' className={st.form__group_label}>Фамилия</label>

                </div>

                <div className={`${st.input__group_lastname}  ${st.form__group}`}>
                    <input
                        id='emailFiled'
                        placeholder=' '
                        className={`${st.input}  ${errors.email && st.input__error}`}
                        type='text'
                        onFocus={() => changeInput('email')}
                        {...register('email', {onBlur: () => setIsFocusEmail(false), disabled:isAllFieldDisabled})}
                    />
                    <label htmlFor='emailFiled' className={st.form__group_label}>E-mail</label>
                    {conditionEmptyEmail &&
                        <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}
                    {errors.email && errors.email?.type === 'emailError' &&
                        <span data-test-id='hint' className={st.error}>{errors?.email.message}</span>}
                </div>

            </div>
            </div>
            <div className={st.container__btn_submit}>
                <button className={`${st.form__btn_submit} ${st.edit_btn}`} type='button'
                        data-test-id='edit-button'
                        onClick={()=>{setAllFieldDisabled(!isAllFieldDisabled)}}>Редактировать
                </button>
                <button className={`${st.form__btn_submit} ${st.save_btn}`}
                        type='button'
                        data-test-id='save-button'
                        disabled={isAllFieldDisabled}
                        onClick={saveEditDataUser}>Сохранить изменения
                </button>
            </div>


        </form>
    );
}
// disabled={!isDirty || !isValid ||!validatePhone(itemPhone)}