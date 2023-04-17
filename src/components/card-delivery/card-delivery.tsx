import React from 'react';
import imgNotBook from '../../assets/img/imageNotBook.jpg';
import st from './card-delivery.module.css';
import {useAppSelector} from '../../store/selectors/hook';
import {baseUrl} from "../../shared/constants/url";
import {stars} from "../../shared/constants/stars";
import star1 from "../../assets/icon/star1.png";
import star0 from "../../assets/icon/star0.png";
import {
    deliveryBookSelector, deliveryDateToSelector
} from "../../store/selectors/user-state-selectors";
import {mock} from "../../shared/mosk-delivery-history";


export const CardDelivery = () => {
    const bookState = useAppSelector(deliveryBookSelector);
    const deliveryDateToState = useAppSelector(deliveryDateToSelector);
    const bookMock = mock.delivery.book;
    const deliveryDateToMock =  mock.delivery.dateHandedTo;
    const book = bookMock || bookState;
    const deliveryDateTo =  deliveryDateToMock || deliveryDateToState;


const convertationDateDelivery = (date: Date | undefined): string => {
    if(date){
        let item = new Date(date).getDate().toString();
        let itemMonth = (new Date(date).getMonth() + 1).toString();
        if(+item<10) item = `0${item}`
        if(+itemMonth<10) itemMonth = `0${itemMonth}`
        return `${item}.${itemMonth}`
    }
return '';
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
                    <button type='submit' style= {{color:'rgb(255, 82, 83)'}} className={st.delivery__date_to} data-test-id=''>{`возврат ${convertationDateDelivery(deliveryDateTo)}`}</button>

                </div>
            </div>
        </div>

    );
}