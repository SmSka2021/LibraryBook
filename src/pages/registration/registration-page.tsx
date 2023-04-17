import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import st from './registration.module.css';
import {RegistrationStep1} from '../../components/registration-steps/registration-step1';
import {RegistrationStep2} from '../../components/registration-steps/registration-step2';
import {RegistrationStep3} from '../../components/registration-steps/registration-step3';
import {isAuth} from '../../shared/utils/save-local-storage';
import {isAuthSelector, stepRegistrationSelector} from '../../store/selectors/user-state-selectors';
import {useAppSelector} from '../../store/selectors/hook';


export const RegistrationPage = () => {
    const isAuthState = useAppSelector(isAuthSelector);
    const stepRegistration = useAppSelector(stepRegistrationSelector);
    const isAuthUser = isAuthState || isAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthUser )  navigate('/books/all');
     },[isAuthUser, navigate])

    return (
        <section>
            {stepRegistration && <div className={st.form__wrapper}>
                <h2 className={st.form__title}>Регистрация</h2>
                <p className={st.form__step_title}>{`${stepRegistration} шаг из 3`}</p>
                {stepRegistration === '1' && <RegistrationStep1 />}
                {stepRegistration === '2' && <RegistrationStep2 />}
                {stepRegistration === '3' && <RegistrationStep3 />}
            </div>}
        </section>
    );
}
