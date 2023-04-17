import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {InputTypesRegistration} from '../../interfaces/interfaces';
import {schemaPasswords} from '../../shared/validation/shema-reset';
import eyeClosed from '../../assets/icon/EyeClosed.svg';
import eyeOpen from '../../assets/icon/Icon_Action.svg';
import okIcon from '../../assets/icon/CheckCircle.svg';
import {
    setNewPassword,
} from '../../store/reducers/user-data-reducer';
import {
    messageEmptyField,
    messageFieldPassword
} from '../../shared/constants/message';
import st from './forgot.module.css';
import {useAppDispatch} from '../../store/store';
import {fetchResetPassword} from '../../store/thunks/reset-password-thunk';
import {dataUserCodeSelector} from '../../store/selectors/user-state-selectors';
import {useAppSelector} from '../../store/selectors/hook';



export const ForgotStep2 = () => {
    const [isFocusPassword1, setIsFocusPassword1] = useState(false);
    const [isFocusPassword2, setIsFocusPassword2] = useState(false);
    const [passwordInputType1, setPasswordInputType1] = useState('password');
    const [passwordInputType2, setPasswordInputType2] = useState('password');
    const [isChangeInputPassword1, setIsChangeInputPassword1] = useState(false);
    const [isChangeInputPassword2, setIsChangeInputPassword2] = useState(false);
    const dataUserCode = useAppSelector(dataUserCodeSelector)
    const dispatch = useDispatch();
    const dispatchApi = useAppDispatch();
    const {
        register,
        getValues,
        getFieldState,
        formState: {errors, isDirty, isValid},
    } = useForm<InputTypesRegistration>({
        resolver: yupResolver(schemaPasswords),
        mode: 'onChange',
    });

    const conditionEmptyPassword1 = isChangeInputPassword1 && !isFocusPassword1 && getValues('password') === '';
    const conditionEmptyPassword2 = isChangeInputPassword2 && !isFocusPassword2 && getValues('passwordConfirmation') === '';
    const changeTypeInputPassword = (num: number) => {

        if (num === 1) {
            if (passwordInputType1 === 'password') {
                setPasswordInputType1('text');

                return
            }
            setPasswordInputType1('password');
        }
        if (num === 2) {
            if (passwordInputType2 === 'password') {
                setPasswordInputType2('text');

                return
            }
            setPasswordInputType2('password');
        }
    };
    const changeInput = (inputName: string) => {
        if (inputName === 'password') {
            setIsChangeInputPassword1(true);
            setIsFocusPassword1(true);
        } else {
            setIsChangeInputPassword2(true);
            setIsFocusPassword2(true);
        }
    }
    const nextStep = async() => {
        if (isDirty && isValid) {
            const newPasswordUser = getValues('password') as string;
            const dataUser = {
                password: newPasswordUser,
                passwordConfirmation: newPasswordUser,
                code: dataUserCode,
            }
            await  dispatch(setNewPassword({newPassword: newPasswordUser}));

            dispatchApi(fetchResetPassword(dataUser));
        }
    }
    const isDisabledBtnSubmit = ():boolean => {
      if(!isDirty) return true;
      if(getFieldState('password')?.invalid && isFocusPassword1) return true;
      if(!getFieldState('password')?.invalid && isFocusPassword1) return true;
      if(getFieldState('passwordConfirmation')?.invalid && !isFocusPassword2) return true;

      return (getValues('passwordConfirmation') === '') && !isFocusPassword2;
    }

    return (
        <form className={st.innerContainer} data-test-id='reset-password-form'>

            <div className={`${st.input__group_password}  ${st.form__group}`}>
                <input
                    id='inputPassword1'
                    placeholder=' '
                    className={`${st.input}  ${errors.password && st.input__error}`}
                    type={passwordInputType1}
                    onFocus={() => changeInput('password')}
                    {...register('password', {onBlur: () => setIsFocusPassword1(false)})}
                />
                <label htmlFor='inputPassword1' className={st.form__group_label}>Новый
                    пароль</label>

                {getValues('password') === '' && isFocusPassword1 &&
                    <span data-test-id='hint' className={st.error__message}>{messageFieldPassword}</span>}
                {!errors.password && !conditionEmptyPassword1  && !isFocusPassword1 &&
                    <span data-test-id='hint' className={st.error__message}>{messageFieldPassword}</span>}
                {!errors.password && isChangeInputPassword1  && isFocusPassword1 && getValues('password') !== '' &&
                    <span data-test-id='hint' className={st.error__message}>{messageFieldPassword}</span>}

                {isFocusPassword1 && errors.password?.type === 'passwordErrLength' &&
                    <p data-test-id='hint' className={st.error__message}>Пароль <span
                        className={st.error}>{errors.password.message}</span>, с<span className={st.error__message}> заглавной
                        буквой и цифрой</span></p>}
                {isFocusPassword1 && errors.password?.type === 'passwordErrLengthAndNumber' &&
                    <p data-test-id='hint' className={st.error__message}>Пароль <span className={st.error}>не менее 8 символов</span>,
                        <span className={st.error__message}> с заглавной буквой и </span><span className={st.error}>цифрой</span></p>}
                {isFocusPassword1 && errors.password?.type === 'passwordErrLengthAndBigLetter' &&
                    <p data-test-id='hint' className={st.error__message}>Пароль <span className={st.error}>не менее 8 символов</span>, с <span className={st.error}>заглавной буквой</span><span className={st.error__message}> и цифрой</span></p>}
                {isFocusPassword1 && errors.password?.type === 'passwordErrLengthAndBigLetterAndNumber' &&
                    <span data-test-id='hint' className={st.error__message}>Пароль <span className={st.error}>не менее 8 символов</span>, с <span className={st.error}>заглавной буквой</span> и <span
                            className={st.error}>цифрой</span></span>}
                {conditionEmptyPassword1  &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}
                {errors.password && !isFocusPassword1 && errors.password?.type !== 'required' &&
                    <span data-test-id='hint' className={st.error}>{messageFieldPassword}</span>}

                {getFieldState('password').isDirty &&
                    <button data-test-id={passwordInputType1 === 'password' ? 'eye-closed' : 'eye-opened'}
                        type='button' className={st.password__btn_eye}
                            onClick={() => changeTypeInputPassword(1)}>
                        <img src={passwordInputType1 === 'password' ? eyeClosed : eyeOpen}
                             alt='icon'/>
                    </button>}
                {!errors?.password && getFieldState('password').isDirty &&
                    <img  data-test-id='checkmark' src={okIcon} className={st.okIcon} alt='icon'/>}
            </div>


            <div className={`${st.input__group_password}  ${st.form__group}`}>
                <input
                    id='inputPassword2'
                    placeholder=' '
                    className={`${st.input}  ${errors.passwordConfirmation && st.input__error}`}
                    type={passwordInputType2}
                    onFocus={() => changeInput('passwordConfirmation')}
                    {...register('passwordConfirmation', {onBlur: () => setIsFocusPassword2(false)})}
                />
                <label htmlFor='inputPassword2' className={st.form__group_label}>Повторите
                    пароль</label>

                {conditionEmptyPassword2  &&
                    <span data-test-id='hint' className={st.error}>{messageEmptyField}</span>}
                {!isFocusPassword2 && errors.passwordConfirmation && errors.passwordConfirmation?.type === 'passwordRight' &&
                    <span data-test-id='hint' className={st.error}>{errors?.passwordConfirmation.message}</span>}

                {getFieldState('passwordConfirmation').isDirty &&
                    <button data-test-id={passwordInputType2 === 'password' ? 'eye-closed' : 'eye-opened'}
                            type='button' className={st.password__btn_eye}
                            onClick={() => changeTypeInputPassword(2)}>
                        <img src={passwordInputType2 === 'password' ? eyeClosed : eyeOpen}
                             alt='icon'/>
                    </button>}
            </div>


            <button className={`${st.form__btn_submit} ${st.btn__forgot}`} type='button' disabled={isDisabledBtnSubmit()}
                    onClick={nextStep}>Сохранить изменения
            </button>
            <div className={st.container__link}>
                <p className={st.container__link_ask}>После сохранения войдите в библиотеку,
                    используя новый пароль</p>
            </div>
        </form>
    );
}
