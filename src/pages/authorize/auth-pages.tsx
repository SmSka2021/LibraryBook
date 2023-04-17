import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import st from './auth-pages.module.css';
import {Authorize} from '../../components/authorize';
import {isAuth} from '../../shared/utils/save-local-storage';
import {isAuthSelector, isShowAuthSelector} from '../../store/selectors/user-state-selectors';
import {useAppSelector} from '../../store/selectors/hook';



export const AuthPages = () => {
    const isAuthState = useAppSelector(isAuthSelector);
    const isShowAuth = useAppSelector(isShowAuthSelector);
    const isAuthUser = isAuthState || isAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthUser)  navigate('/books/all');
    },[navigate, isAuthUser])

    return (
        <section>
                {isShowAuth && <div className={st.form__wrapper}>
                    <h2 className={st.form__title}>Вход в личный кабинет</h2>
                    <Authorize />
                </div>}
        </section>
    );
}
