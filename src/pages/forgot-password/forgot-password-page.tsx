import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, Link, useLocation} from 'react-router-dom';
import queryString from 'query-string';
import st from './forgot-password.module.css';
import {isAuth} from '../../shared/utils/save-local-storage';
import {ForgotStep1} from '../../components/forgot-password/forgot-step1';
import iconAuth from '../../assets/icon/Icon_prev.svg';
import {ForgotStep2} from '../../components/forgot-password/forgot-step2';
import {setNewCodePassword} from '../../store/reducers/user-data-reducer';
import {isAuthSelector, isShowForgotSelector} from '../../store/selectors/user-state-selectors';
import {useAppSelector} from '../../store/selectors/hook';



export const ForgotPasswordPage = () => {
    const [isFirstStep, setIsFirstStep] = useState(true);
    const isAuthState = useAppSelector(isAuthSelector);
    const isShowForgot = useAppSelector(isShowForgotSelector);
    const isAuthUser = isAuthState || isAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

     useEffect(()=>{
         if(isAuthUser ) navigate('/books/all');
     },[isAuthUser, navigate]);

    useEffect(()=> {
        if(location.search) {
            setIsFirstStep(false);
            const query = queryString.parse(location.search);

            dispatch(setNewCodePassword({code: query.code}));
        }

    },[location.search, dispatch])

    return (
        <section>
                {isShowForgot && <div className={st.form__wrapper}>
                    {isFirstStep &&  <Link to='/auth' className={st.form__container_link}>
                        <img className={st.form__link_img} src={iconAuth} alt='icon'/>
                        <span className={st.form__link_txt}>вход в личный кабинет</span>
                    </Link>}
                    <div className={st.form__container}>
                        <h2 className={st.form__title}>Восстановление пароля</h2>
                        {isFirstStep &&  <ForgotStep1 /> }
                        {!isFirstStep && <ForgotStep2/>}
                    </div>
                </div>}
        </section>
    );
}
