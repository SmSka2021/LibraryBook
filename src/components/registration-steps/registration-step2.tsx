import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import st from './registration-steps.module.css';
import {InputTypesRegistration} from '../../interfaces/interfaces';
import {schemaName} from '../../shared/validation/shema-name';
import linkIcon from '../../assets/icon/Icon_Chevron.svg';
import {
    setStepsRegistration,
    setUserFirstName,
    setUserLastName
} from '../../store/reducers/user-data-reducer';
import {messageEmptyField} from '../../shared/constants/message';


export const RegistrationStep2 = () => {
    const [isFocusFirstName, setIsFocusFirstName] = useState(false);
    const [isFocusLastName, setIsFocusLastName] = useState(false);
    const [isChangeInputFirstName, setIsChangeInputFirstName] = useState(false);
    const [isChangeInputLastName, setIsChangeInputLastName] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        reset,
        getValues,
        formState: {errors, isDirty, isValid},
    } = useForm<InputTypesRegistration>({
        resolver: yupResolver(schemaName),
        mode: 'onChange',
    });
    const conditionEmptyFirstName = isChangeInputFirstName && !isFocusFirstName && getValues('firstName') === '';
    const conditionEmptyLastName = isChangeInputLastName && !isFocusLastName && getValues('lastName') === '';
    const nextStep = () => {
        if (isDirty && isValid) {
            dispatch(setUserFirstName({firstName: getValues('firstName')}));
            dispatch(setUserLastName({lastName: getValues('lastName')}));
            dispatch(setStepsRegistration({step:'3'}));
            reset();
        }
    }
    const changeInput = (inputName: string) => {
        if (inputName === 'firstName') {
            setIsChangeInputFirstName(true);
            setIsFocusFirstName(true);
        } else {
            setIsChangeInputLastName(true);
            setIsFocusLastName (true)
        }
    }

    return (
        <form className={st.innerContainer} data-test-id='register-form'>
            <div className={st.form__group}>
                <input id='firstName'
                       placeholder=' '
                       className={`${st.input} ${errors.firstName && st.input__error}`}
                       type='text'
                       onFocus={() => changeInput('firstName')}
                       {...register('firstName', {onBlur: () => setIsFocusFirstName(false)})}
                />
                <label htmlFor='firstName' className={st.form__group_label}>Имя</label>

                {conditionEmptyFirstName &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}

            </div>
            <div className={`${st.input__group_lastname}  ${st.form__group}`}>
                <input
                    id='lastName'
                    placeholder=' '
                    className={`${st.input}  ${errors.lastName && st.input__error}`}
                    type='text'
                    onFocus={() => changeInput('lastName')}
                    {...register('lastName', {onBlur: () => setIsFocusLastName(false)})}
                />
                <label htmlFor='lastName' className={st.form__group_label}>Фамилия</label>
                {conditionEmptyLastName &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}
            </div>

            <button className={st.form__btn_submit} type='button' disabled={!isDirty || !isValid}
                    onClick={nextStep}>Последний шаг
            </button>
            <div className={st.container__link}>
                <p className={st.container__link_ask}>Есть учётная запись?</p>
                <Link className={st.container__link_item} to='/auth'><span>войти</span><img
                    src={linkIcon} alt='icon'/></Link>
            </div>
        </form>

    );
}
