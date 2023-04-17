import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import imgNotBook from '../../assets/img/imageNotBook.jpg';
import star1 from '../../assets/icon/star1.png';
import star0 from '../../assets/icon/star0.png';
import {IBook, PropsBook} from '../../interfaces/interfaces';
import st from './card_book.module.css';
import {formattedDate} from '../../shared/utils/formated-date';
import {stars} from '../../shared/constants/stars';
import {baseUrl} from '../../shared/constants/url';
import {categoryBookPath} from '../../shared/utils/converter-category-book';
import {
    categoriesSelector,
    checkedCategorySelector
} from '../../store/selectors/category-books-selectors';
import {searchItemSelector} from '../../store/selectors/sort-books-selectors';
import {useAppSelector} from '../../store/selectors/hook';
import {isBookBusyUser} from '../../shared/utils/is-book-busy-user';
import {setIsShowResetOrderModal, setOpenOrderModal} from '../../store/reducers/one-book-reducer';
import {
    setCheckBook,
    setDateOrderCheckBook,
    setIdCheckBook
} from '../../store/reducers/books-reducer';
import {idUserSelector} from "../../store/selectors/user-state-selectors";





export const CardBook = (props: PropsBook) => {
    const { listCheck, bookOne} = props;
    const searchItem = useAppSelector(searchItemSelector);
    const categories = useAppSelector(categoriesSelector);
    const checkedCategory = useAppSelector(checkedCategorySelector);
    const idUser = useAppSelector(idUserSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const statusBook = () => {
        if(!bookOne.booking?.order && !bookOne.delivery?.handed) return  'free';
        if(isBookBusyUser(bookOne, idUser) && bookOne.booking?.order) return 'order_user';
        return 'busy';
    }
    const createOrder = (event: React.MouseEvent | React.KeyboardEvent, oneBook: IBook) => {
        event.stopPropagation();
        dispatch(setIdCheckBook({idBook: oneBook.id}));
        dispatch(setDateOrderCheckBook({order: oneBook.booking?.dateOrder}));
        dispatch(setCheckBook({checkBook: oneBook}));
      
            const el = event.target as HTMLButtonElement;
            if(el.getAttribute('data-status-id') === 'free'){
                dispatch(setOpenOrderModal())
                }
            if(el.getAttribute('data-status-id') === 'order_user'){
                dispatch(setIsShowResetOrderModal({show:true}))
        }

    }
    const openCard = (event: React.MouseEvent | React.KeyboardEvent, id: number) => {
        event.stopPropagation();
        const elem = event.target as HTMLElement;
        const isBtn = elem.hasAttribute('type');

        if (isBtn) return;
        if (checkedCategory) {
            navigate(`/books/${categoryBookPath(categories, checkedCategory)}/${id}`);
        } else {
            navigate(`/books/all/${id}`);
        }
    }
    const colorTitleSearch = (title: string): any => {
        if (!searchItem) return title;
        const idxLetter = title.toLowerCase().indexOf(searchItem.toLowerCase());

        if (idxLetter >= 0) {

            return [title.substring(0, idxLetter), <span data-test-id='highlight-matches' className={st.color_red}>{title.substring(idxLetter, idxLetter + searchItem.length)}</span>, title.substring(idxLetter + searchItem.length)];
        }
        return title;
    }


    return (
        <div data-test-id='card'
             className={`${st.container__card} ${listCheck ? st.container__card_list : st.container__card_table}`}
             role='presentation'
             onKeyDown={(event: React.KeyboardEvent) => openCard(event, bookOne.id)}
             onMouseDown={(event: React.MouseEvent) => openCard(event, bookOne.id)}>
            <img loading='lazy' className={listCheck ? st.card__img_list : st.card__img}
                 src={bookOne.image?.url ? `${baseUrl}${bookOne.image.url}` : imgNotBook}
                 alt='img book'/>
            <div className={st.container__card_info}>
                <div className={listCheck ? st.container__stars_list : st.container__stars}>
                    {!bookOne.rating
                        ? <p className={st.card__not_star}>eщё нет оценок</p>
                        : stars.map((star, index) => (
                            <img key={crypto.randomUUID()}
                                 className={st.card_img_star}
                                 src={(index + 1 <= bookOne.rating!) ? star1 : star0}
                                 alt='stars'/>
                        ))}
                </div>
                <div
                    className={listCheck ? st.card__container_list_title : st.card__container_title}>
                    <p className={listCheck ? st.card__title_list : st.card__title}>{colorTitleSearch(bookOne.title)}</p>
                    <p className={listCheck ? st.card__author_list : st.card__author}>{`${bookOne.authors?.join(', ')}, ${props.bookOne.issueYear}`}</p>
                </div>

                <button type='button'
                        className={
                            `${st.btn} 
                             ${(!bookOne.booking?.order && !bookOne.delivery?.handed) ? st.btn_free : ''}
                             ${(isBookBusyUser(bookOne, idUser) && bookOne.booking?.order) ? st.btn_order_user : ''}
                             ${(!isBookBusyUser(bookOne, idUser) && bookOne.booking?.order) ? st.btn_order : ''}
                             ${listCheck ? st.btn_list : ''}
                             ${bookOne.delivery?.handed ? st.btn_busy : ''}`}
                        onClick={(event: React.MouseEvent) => createOrder(event,  bookOne)}
                        data-status-id = {statusBook()}
                        data-test-id='booking-button'
                        disabled={bookOne.delivery?.handed || (bookOne.booking?.order && !isBookBusyUser(bookOne, idUser))}
                >
                    {bookOne?.delivery?.handed && !bookOne?.booking?.order && `занята до ${formattedDate(bookOne.delivery?.dateHandedTo)}`}
                    {bookOne?.booking?.order && !bookOne?.delivery?.handed && 'забронирована'}
                    {bookOne?.delivery?.handed && bookOne?.booking?.order && `занята до ${formattedDate(bookOne.delivery?.dateHandedTo)}`}
                    {(!bookOne?.delivery?.handed && !bookOne?.booking?.order) && 'забронировать'}

                </button>
            </div>
        </div>

    );
}
