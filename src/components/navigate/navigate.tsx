import React, {useRef, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import st from './navigate.module.css';
import {CategoriesBooks, PropsNavigate} from '../../interfaces/interfaces';
import btnUp from '../../assets/icon/icon_up_btn.svg';
import btnDown from '../../assets/icon/icon_down_btn.svg';
import {store} from '../../store/store';
import {closeMenu} from '../../store/reducers/visible-menu-reduser';
import {setCategory} from '../../store/reducers/category-reducer';
import {setSearchItems} from '../../store/reducers/sort-books-reducer';
import {setResetIsAuth} from '../../store/reducers/user-data-reducer';
import {
    countBookCategorySelector,
    statusFetchBooksSelector
} from '../../store/selectors/books-state-selectors';
import {
    categoriesSelector,
    statusFetchCategorySelector
} from '../../store/selectors/category-books-selectors';
import {sizeScreenSelector} from '../../store/selectors/resize-screen-selectors';
import {useAppSelector} from '../../store/selectors/hook';
import {isAuth} from "../../shared/utils/save-local-storage";
import {isAuthSelector} from "../../store/selectors/user-state-selectors";



export const Navigate = (props: PropsNavigate) =>  {
    const {dataId, navigationBurger} = props;

    const [isShowList, setIsShowList] = useState(true);
    const [isShowBtnList, setIsShowBtnList] = useState(true);
    const [isOpenBurger, setIsOpenBurger] = useState(false);
    const listRef = useRef<HTMLUListElement>(null);

    const categories = useAppSelector(categoriesSelector);
    const statusFetchCategory = useAppSelector(statusFetchCategorySelector);
    const sizeScreen = useAppSelector(sizeScreenSelector);
    const countBookCategory = useAppSelector(countBookCategorySelector);
    const statusFetchBooks = useAppSelector(statusFetchBooksSelector);
    const isAuthState = useAppSelector(isAuthSelector);
    const succeededFetchCategory = statusFetchCategory === 'succeeded';
    const succeededFetchBooks = statusFetchBooks === 'succeeded';
    const navigate = useNavigate();
    const isAuthUser = isAuthState || isAuth();

    store.subscribe(() => { setIsOpenBurger(store.getState().visibleMenu.isOpenMenu)});
    const dispatch = useDispatch();
    const setCheckedCategory = (item: string) => {
        dispatch(setCategory({checked: item}))
    }

    const setCloseMenu = (event: React.MouseEvent | React.KeyboardEvent ) => {
        event.stopPropagation();
        const elem = event.target as HTMLElement;

        if(elem.closest('.notCloseMenu')) {
            setIsShowList(!isShowList);

            return;
        }
        dispatch(closeMenu());
        document.body.style.position = '';
    }

    const setIsHideAllList =()=> {
        if (listRef && listRef.current) {
            listRef.current.style.display = 'none';
            setIsShowList(false);
            setIsShowBtnList(true);
            dispatch(setSearchItems({searchItems: ''}))
    }
}
    const setIsShowAllList =()=> {
        if (listRef && listRef.current) {
            listRef.current.style.display = 'block';
            setIsShowList(true);
            setIsShowBtnList(true);
        }
    }
    const removeAuth = () => {
        localStorage.clear();
        setIsShowBtnList(false);
        navigate('/auth');
        dispatch(setResetIsAuth());
    }
    const openProfile = () => {
        if(!isAuthUser)  navigate('/auth');
        navigate('/profile');
    }
    return (
        <nav data-test-id={dataId}
            className={`${st.nav} ${isOpenBurger ? st.nav_visible : ''}`}  role='presentation' onClick={(event: React.MouseEvent) => setCloseMenu(event)}>
            <ul>
                <li className={st.nav__li}>
                    <div data-test-id={`${navigationBurger}-showcase`}
                         role='presentation'
                         onClick={isShowList ? setIsHideAllList: setIsShowAllList}
                         className= {[st.container__li, 'notCloseMenu'].join(' ')}>
                        <NavLink
                            className={(data) => data.isActive ? st.nav__item_generalA : st.nav__item_general}
                            to='/books'
                            onClick={()=> setIsShowBtnList(true)}>Витрина книг
                        </NavLink>
                        { succeededFetchCategory && succeededFetchBooks && isShowBtnList && <button className={st.li_btn} type='button' >
                            <img src={isShowList? btnUp : btnDown } alt='btn up'/>
                        </button>}
                    </div>
                   <ul className={st.nav__list} ref={listRef}>
                       {succeededFetchCategory && succeededFetchBooks && <li  className={st.nav__li_inside}
                                 role='presentation'
                                 onClick={() => setCheckedCategory('')}>
                                <NavLink
                                    data-test-id={`${navigationBurger}-books`}
                                    className={(data) => data.isActive ? st.nav__itemA : st.nav__item}
                                    to='/books/all'>Все книги</NavLink>
                            </li>}
                            { succeededFetchCategory && succeededFetchBooks && categories.map((link: CategoriesBooks) => (
                                <li  key={crypto.randomUUID()}
                                     role='presentation'
                                     onClick={() => setCheckedCategory(link.name)}
                                     className={st.nav__li_inside}>
                                    <NavLink
                                        data-test-id={`${navigationBurger}-${link.path}`}
                                        className={(data) => data.isActive ? st.nav__itemA : st.nav__item}
                                        to={`/books/${link.path}`}>{link.name}</NavLink>
                                    <span data-test-id={`${navigationBurger}-book-count-for-${link.path}`} className={st.nav__item_count}>
                                        { countBookCategory[link.name] ? countBookCategory[link.name] : 0 }
                                    </span>
                                </li>))}
                        </ul>
                </li>
                <li className={st.nav__li}>
                    <NavLink
                        data-test-id={`${navigationBurger}-terms`}
                        className={(data) => data.isActive ? st.nav__item_generalA : st.nav__item_general}
                        to='/rule'
                        onClick={setIsHideAllList}
                       >Правила пользования</NavLink>
                </li>
                <li className={st.nav__li}>
                    <NavLink
                        data-test-id={`${navigationBurger}-contract`}
                        className={(data) => data.isActive ? st.nav__item_generalA : st.nav__item_general}
                        to='/contract'
                        onClick={setIsHideAllList}>Договор оферты</NavLink>
                </li>
                <div className={st.nav__li_enter}
                    >
                    <li className={st.nav__li}>
                        <NavLink
                            className={ st.nav__item_general}
                            // data-test-id='profile-button'
                            to='/profile'
                            onClick={()=> setIsShowBtnList(false)}>Профиль</NavLink>
                    </li>
                    <li className={st.nav__li}>
                        <NavLink
                            data-test-id='exit-button'
                            className={ st.nav__item_general}
                            to='/contract'
                            onClick={removeAuth}>Выход</NavLink>
                    </li>
                </div>
            </ul>
        </nav>
    )
}




