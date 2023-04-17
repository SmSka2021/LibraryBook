import React from 'react';

import imgNotBook from '../../assets/img/imageNotBook.jpg';
import st from './card-booking.module.css';
import {useAppSelector} from '../../store/selectors/hook';
import {baseUrl} from "../../shared/constants/url";
import {stars} from "../../shared/constants/stars";
import star1 from "../../assets/icon/star1.png";
import star0 from "../../assets/icon/star0.png";
import {
    bookingBookSelector,
    bookingIdSelector,
    bookingSelector
} from "../../store/selectors/user-state-selectors";
import {fetchDeleteOrderBook} from "../../store/thunks/delete-order-book-thunk";
import {useAppDispatch} from "../../store/store";


export const CardBooking = () => {
    const book = useAppSelector(bookingBookSelector);
    const bookingId = useAppSelector(bookingIdSelector);

    const dispatchApi = useAppDispatch();
    const removeOrder = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.stopPropagation();
        dispatchApi(fetchDeleteOrderBook(bookingId as number));
    }
    return (
        <div data-test-id='card'
             className={`${st.container__card} ${st.container__card_list}`}>

            <img loading='lazy' className={st.card__img_list}
                 src={book?.image ? `${baseUrl}${book.image}` : imgNotBook}
                 alt='img book'/>
            <div className={st.container__card_info}>

                <div className={st.card__container_list_title}>
                    <p className={st.card__title_list}>{book?.title}</p>
                    <p className={st.card__author_list}>{`${book?.authors?.join(', ')}, ${book?.issueYear}`}</p>
                </div>
                <div className={st.container__stars_and_btn}>
                    <div className={st.container__stars_list}>
                        {!book?.rating
                            ? <p className={st.card__not_star}>eщё нет оценок</p>
                            : stars.map((star, index) => (
                                <img key={crypto.randomUUID()}
                                     className={st.card_img_star}
                                     src={(index + 1 <= book.rating!) ? star1 : star0}
                                     alt='stars'/>
                            ))}
                    </div>
                    <button type='button'
                            className={`${st.btn} ${st.btn_free}  `}
                            onClick={(event: React.MouseEvent) => removeOrder(event)}
                            data-test-id='cancel-booking-button'>Отменить бронь
                    </button>

                </div>
            </div>
        </div>

    );
}