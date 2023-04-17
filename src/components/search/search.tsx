import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import st from './search.module.css';
import {PropsMain} from '../../interfaces/interfaces';
import btnSearch from '../../assets/icon/icon_search.svg';
import btnSortUp from '../../assets/icon/sort_up.svg';
import btnSortDown from '../../assets/icon/sort_down.svg';
import {SCREEN_HIDE_FORM} from '../../shared/constants/const-breakpoint';
import {setIsSortUp, setSearchItems} from '../../store/reducers/sort-books-reducer';
import {sizeScreenSelector} from '../../store/selectors/resize-screen-selectors';
import {searchItemSelector, sortUpSelector} from '../../store/selectors/sort-books-selectors';
import {useAppSelector} from '../../store/selectors/hook';




export const Search = (props: PropsMain) => {
    const {changeView} = props;
    const [searchFocus, isSearchFocus] = useState(false);
    const [isStartSearch, setIsStartSearch] = useState(false);
    const [listCheck, isViewCheck] = useState(false);
    const dispatch = useDispatch();
    const sizeScreen = useAppSelector(sizeScreenSelector)
    const searchItem = useAppSelector(searchItemSelector)
    const sortUp = useAppSelector(sortUpSelector)
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const sortBtnRef = useRef<HTMLButtonElement>(null);

    const isViewList = (): void => {
        isViewCheck(true);
        changeView(true);
    }
    const isNotViewList = (): void => {
        isViewCheck(false);
        changeView(false);
    }
    const openSearchInput = () => {
        setIsStartSearch(true);
        isSearchFocus(true);
        if (formRef && formRef.current && inputRef && inputRef.current && sortBtnRef && sortBtnRef.current) {
            formRef.current.style.display = 'flex';
            formRef.current.style.width = '100%';
            inputRef.current.style.width = '100%';
            inputRef.current.focus();
        }
    }
    const closeSearchInput = () => {
        if (sizeScreen <= SCREEN_HIDE_FORM) {
            if (formRef && formRef.current) {
                formRef.current.style.display = 'none';
                setIsStartSearch(false);
                isSearchFocus(false);
            }
        }
    }
    const setItemSearch = () => {
        dispatch(setSearchItems({searchItems: inputRef?.current?.value}))
    }

    return (
        <div className={st.search__container}>

            <form className={st.search__container_input} ref={formRef}>
                <input type='text'
                       className={st.input_search}
                       data-test-id='input-search'
                       ref={inputRef}
                       placeholder='Поиск книги или автора…'
                       onFocus={() => isSearchFocus(true)}
                       onBlur={() => isSearchFocus(false)}
                       value={searchItem}
                       onChange={setItemSearch}
                />

                <button type='button'
                        data-test-id='button-search-close'
                        className={st.search__btn_end}
                        onClick={() => closeSearchInput()}> </button>
                {!isStartSearch && <button type='button'
                                           data-test-id='sort-rating-button' ref={sortBtnRef}
                                           className={`${st.input_btn_sort} ${sortUp ? st.sort_up : st.sort_down}`}
                                           onClick={() => dispatch(setIsSortUp())}> По рейтингу
                </button>}
            </form>

            {!isStartSearch && <React.Fragment>
                <div className={st.container__btn_min}>
                    <button className={st.btn__search_min} data-test-id='button-search-open'
                            type='button' onClick={openSearchInput}><img src={btnSearch}
                                                                         alt='button search'/>
                    </button>
                    <button className={st.btn__sort_min}
                            type='button' onClick={() => dispatch(setIsSortUp())}>{
                        sortUp ?
                            <img src={btnSortUp} alt='button sort up'/>
                            : <img src={btnSortDown} alt='button sort down'/>
                    }</button>
                </div>
                <div className={st.search__container_btn}>
                    <button data-test-id='button-menu-view-window'
                            className={`${st.btn} ${listCheck ? st.btn__table : st.btn__table_check}`}
                            type='button' onClick={isNotViewList}> </button>
                    <button data-test-id='button-menu-view-list'
                            className={`${st.btn} ${listCheck ? st.btn__list_check : st.btn__list}`}
                            type='button' onClick={isViewList}> </button>
                </div>
            </ React.Fragment>
            }
        </div>
    );
}
