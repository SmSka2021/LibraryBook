import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import {InputMask} from 'primereact/inputmask';
import {yupResolver} from '@hookform/resolvers/yup';
import st from './registration-steps.module.css';
import {InputTypesRegistration} from '../../interfaces/interfaces';
import {validatePhone} from '../../shared/validation/shema-phone';
import linkIcon from '../../assets/icon/Icon_Chevron.svg'
import {setUserPhone, setUserEmail} from '../../store/reducers/user-data-reducer';
import {messageEmptyField, messageFormatPhone} from '../../shared/constants/message';
import {useAppDispatch} from '../../store/store';
import {fetchRegistrationUser} from '../../store/thunks/registration-thunk';
import {schemaEmail} from '../../shared/validation/shema-email';
import {dataUserSelector} from '../../store/selectors/user-state-selectors';
import {useAppSelector} from '../../store/selectors/hook';



export const RegistrationStep3 = () => {
    const [isFocusPhone, setIsFocusPhone] = useState(false)
    const [isFocusEmail, setIsFocusEmail] = useState(false)
    const [itemPhone, setItemPhone] = useState('');
    const [isChangeInputPhone, setIsChangeInputPhone] = useState(false);
    const [isChangeInputEmail, setIsChangeInputEmail] = useState(false);
    const dataUser = useAppSelector(dataUserSelector)
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
    const changeInput = (str: string) => {
        if(str === 'email') {
            setIsChangeInputEmail(true);
            setIsFocusEmail(true);
        } else {
            setIsChangeInputPhone(true);
            setItemPhone(str)
        }
    }
    const nextStep =() => {

        if (isDirty && isValid) {
            const data = {...dataUser};
            data.email = getValues('email') as string;
            data.phone = itemPhone;
            dispatch(setUserPhone({phone: itemPhone}));
            dispatch(setUserEmail({email: getValues('email')}));
            dispatchApi(fetchRegistrationUser(data));
            reset();
        }
    }
   const conditionErrorPhone = (!isFocusPhone && isChangeInputPhone && itemPhone === '') ||(!validatePhone(itemPhone) && isChangeInputPhone);
   const conditionEmptyEmail = isChangeInputEmail && !isFocusEmail && getValues('email') === '';

    return (
        <form className={st.innerContainer} data-test-id='register-form'>
            <div className={st.form__group}>
                <InputMask
                    value={itemPhone}
                    onChange={(e) => changeInput(e.target.value as string)}
                    mask='+375 (99) 999-99-99'
                    slotChar = 'x'
                    id='phone'
                    type='tel'
                    autoClear={false}
                    required={true}
                    placeholder=' '
                    className={`${st.input} ${conditionErrorPhone && st.input__error}`}
                    onFocus={() => setIsFocusPhone(true)}
                    name='phone'
                    onBlur={() => setIsFocusPhone(false)}
                />
                <label htmlFor='phone' className={st.form__group_label}>Номер телефона</label>
                {!isFocusPhone && isChangeInputPhone && itemPhone === '' &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}
                {isFocusPhone && <span data-test-id='hint' className={st.error__message}>{messageFormatPhone}</span>}
                {isChangeInputPhone && !validatePhone(itemPhone) && !isFocusPhone && itemPhone !== '' &&
                    <span data-test-id='hint' className={st.error}>{messageFormatPhone}</span>}
            </div>
            <div className={`${st.input__group_lastname}  ${st.form__group}`}>
                <input
                    id='emailFiled'
                    placeholder=' '
                    className={`${st.input}  ${errors.email && st.input__error}`}
                    type='text'
                    onFocus={() => changeInput('email')}
                    {...register('email', {onBlur: () => setIsFocusEmail(false)})}
                />
                <label htmlFor='emailFiled' className={st.form__group_label}>E-mail</label>
                {conditionEmptyEmail &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}
                {errors.email && errors.email?.type === 'emailError' &&
                    <span data-test-id='hint' className={st.error}>{errors?.email.message}</span>}
            </div>
            <button className={st.form__btn_submit} type='button' disabled={!isDirty || !isValid ||!validatePhone(itemPhone)}
                    onClick={nextStep}>Зарегистрироваться
            </button>
            <div className={st.container__link}>
                <p className={st.container__link_ask}>Есть учётная запись?</p>
                <Link className={st.container__link_item} to='/auth'><span>войти</span><img
                    src={linkIcon} alt='icon'/></Link>
            </div>
        </form>
    );
}
