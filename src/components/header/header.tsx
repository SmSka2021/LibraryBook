import React, {useRef, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import logo from '../../assets/img/logo.png';
import st from './header.module.css';
import {store, useAppDispatch} from '../../store/store';
import {closeMenu, openMenu} from '../../store/reducers/visible-menu-reduser';
import {SCREEN_HIDE_NAV} from '../../shared/constants/const-breakpoint';
import {Navigate} from '../navigate';
import {getLocalStorage, isAuth} from '../../shared/utils/save-local-storage';
import {sizeScreenSelector} from '../../store/selectors/resize-screen-selectors';
import {useAppSelector} from '../../store/selectors/hook';
import {
    avatarUserSelector, firstNameUserSelector,
    isAuthSelector,
} from '../../store/selectors/user-state-selectors';
import {fetchProfileUser} from '../../store/thunks/profile-thunk';
import {LoadImg} from '../load-img';
import {baseUrl} from "../../shared/constants/url";
import avatar from "../../assets/icon/avatar.svg";



export const Header = () => {

    const [isOpenBurger, setIsOpenBurger] = useState(false);
    const [isVisibleUserLink, setIsVisibleUserLink] = useState('none');
    const sizeScreen = useAppSelector(sizeScreenSelector)
    const isAuthState = useAppSelector(isAuthSelector);
    const userName = useAppSelector(firstNameUserSelector);
    const userAvatar = useAppSelector(avatarUserSelector);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dispatchApi = useAppDispatch();
    const params = useParams();
    const isAuthUser = isAuthState || isAuth();
    const name =  userName || getLocalStorage('name') || 'User';

    store.subscribe(() => {

        if (store.getState().visibleMenu.isOpenMenu) {
            document.body.style.position = 'fixed'
        } else {
            document.body.style.position = '';
        }
        setIsOpenBurger(store.getState().visibleMenu.isOpenMenu)
    })
    const changeVisibleUserLink = () => {
        if (isVisibleUserLink === 'none') {
            setIsVisibleUserLink('flex')
        } else {
            setIsVisibleUserLink('none')
        }
    }
    const removeAuth = () => {
        changeVisibleUserLink();
        localStorage.clear();
        navigate('/auth');
    }
    const openProfile = () => {
        if(!isAuthUser)  navigate('/auth');
         navigate('/profile');
        changeVisibleUserLink();
        dispatchApi(fetchProfileUser());
    }


    return (
        <React.Fragment>
            <header className={st.header}>
                <Link to='/' className={st.header__logo}>
                    <img className={st.header__logo_img} src={logo} alt='logo'/>
                    <h6 className={st.header__logo_txt}>Cleverland</h6>
                </Link>
                <button type='button'
                        data-test-id='button-burger'
                        className={`${st.header__burger} ${isOpenBurger ? st.burger_active : ''}`}
                        onClick={() => isOpenBurger ? dispatch(closeMenu()) : dispatch(openMenu())}>
                    <span className={st.line}> </span>
                    <span className={st.line}> </span>
                    <span className={st.line}> </span>
                </button>
                <h1 className={st.header__title}>{params.category ? 'Библиотека' : 'Личный кабинет'}</h1>
                <div  className={st.header__auth}>
                    <button
                            type='button' onClick={changeVisibleUserLink}
                            className={st.header__auth_name}>Привет, {name}!</button>
                    <div className={st.header__auth_btn}  >
                        <img  className={st.header__auth_img} src={userAvatar ? `${baseUrl}${userAvatar}` : avatar} alt='Avatar'/>

                    </div>

                </div>
                <div className={st.header__auth_nav} style={{display: `${isVisibleUserLink}`}}>
                    <button className={st.auth__nav_link} data-test-id='profile-button' onClick={openProfile} type='button'>Профиль</button>
                    <button className={st.auth__nav_link} onClick={removeAuth} type='button'>Выход
                    </button>
                </div>
            </header>
            {sizeScreen < SCREEN_HIDE_NAV && <Navigate dataId='burger-navigation'
                                                       navigationBurger='burger'
            />}
        </React.Fragment>

    )
}



// [{'id':561,'name':'bronchtein2023_1 (1).jpg',