import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import st from './authorize.module.css';
import {UserRequestAuth} from '../../interfaces/interfaces';
import {schemaAuth} from '../../shared/validation/shema-auth';
import eyeClosed from '../../assets/icon/EyeClosed.svg';
import eyeOpen from '../../assets/icon/Icon_Action.svg';
import linkIcon from '../../assets/icon/Icon_Chevron.svg';
import {
    setNotErrorAuth,
    setUserName,
    setUserPassword
} from '../../store/reducers/user-data-reducer';
import {fetchAuthUser} from '../../store/thunks/auth-thunk';
import {useAppDispatch} from '../../store/store';
import {messageEmptyField} from '../../shared/constants/message';
import {isErrorAuthSelector} from '../../store/selectors/user-state-selectors';
import {useAppSelector} from '../../store/selectors/hook';
import {saveLocalStorage} from "../../shared/utils/save-local-storage";



export const Authorize = () => {
    const [isFocusName, setIsFocusName] = useState(false);
    const [isFocusPassword, setIsFocusPassword] = useState(false);
    const [isChangeInputName, setIsChangeInputName] = useState(false);
    const [isChangeInputPassword, setIsChangeInputPassword] = useState(false)
    const [passwordInputType, setPasswordInputType] = useState('password');
    const isErrorAuth = useAppSelector(isErrorAuthSelector);
    const dispatch = useDispatch();
    const dispatchApi = useAppDispatch();


    const {
        register,
        getValues,
        handleSubmit,
        formState: {errors, isDirty, isValid},
    } = useForm<UserRequestAuth>({
        resolver: yupResolver(schemaAuth),
        mode: 'onChange',
    });
    const conditionEmptyName = isChangeInputName && !isFocusName && getValues('identifier') === '';
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
    const changeTypesInputPassword = () => {
        if (passwordInputType !== 'password') {
            setPasswordInputType('password');

            return;
        }
        setPasswordInputType('text');
    };

    const onSubmit = async (data:UserRequestAuth) => {
        if (isDirty && isValid) {
            saveLocalStorage('password', getValues('password'));

            await dispatch(setUserName({username: data.identifier}));
            await dispatch(setUserPassword({password: data.password}));

            dispatchApi(fetchAuthUser(data));
        }
    }

    const resetError = ()=> dispatch(setNotErrorAuth())

    return (
        <form className={st.innerContainer} data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)}>
            <div className={st.form__group}>
                <input id='inputName'
                       placeholder=' '
                       className={`${st.input} ${(errors.identifier || isErrorAuth || conditionEmptyName) && st.input__error}`}
                       type='text'
                       onFocus={() => changeInput('identifier')}
                       {...register('identifier', {onBlur: () => setIsFocusName(false)})}
                />
                <label htmlFor='inputName' className={st.form__group_label}>Логин</label>

                {(conditionEmptyName || errors.identifier) &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}

            </div>
            <div className={`${st.input__group_password}  ${st.form__group}`}>
                <input
                    id='inputPassword'
                    placeholder=' '
                    className={`${st.input}  ${(errors.password || isErrorAuth || conditionEmptyPassword) && st.input__error}`}
                    type={passwordInputType}
                    onFocus={() => changeInput('password')}
                    {...register('password', {onBlur: () => setIsFocusPassword(false)})}
                />
                <label htmlFor='inputPassword' className={st.form__group_label}>Пароль</label>

                {conditionEmptyPassword &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}

                {isChangeInputPassword && <button type='button'
                        data-test-id={passwordInputType === 'password' ? 'eye-closed' : 'eye-opened'}
                        className={st.password__btn_eye}
                        onClick={changeTypesInputPassword}>
                    <img src={passwordInputType === 'password' ? eyeClosed : eyeOpen}
                         alt='icon'/>
                </button>}
            </div>
            {!isErrorAuth &&
                <Link className={st.link__forgot} to='/forgot-pass'>Забыли логин или пароль?</Link>}
            {isErrorAuth && <div className={st.container__link__forgot}>
                <span data-test-id='hint' className={`${st.link__forgot_red} ${st.link__forgot}`}>Неверный логин или
                    пароль!</span>
                <Link className={st.link__forgot} to='/forgot-pass' onClick={resetError}>Восстановить?</Link>
            </div>}

            <button className={st.form__btn_submit} type='submit' disabled={!isDirty || !isValid}
                    >Вход
            </button>
            <div className={st.container__link}>
                <p className={st.container__link_ask}>Нет учётной записи?</p>
                <Link className={st.container__link_item}
                      onClick={resetError}
                      to='/registration'><span>регистрация</span><img
                    src={linkIcon} alt='icon'/></Link>
            </div>
        </form>
    );
}
