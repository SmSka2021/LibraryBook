import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import st from './profile-pages.module.css';
import {baseUrl} from '../../shared/constants/url';
import avatar from '../../assets/icon/avatar.svg';
import {useAppSelector} from '../../store/selectors/hook';
import {
    avatarUserSelector, bookingSelector, deliverySelector,
    firstNameUserSelector, historySelector,
    lastNameUserSelector
} from '../../store/selectors/user-state-selectors';
import {getLocalStorage} from '../../shared/utils/save-local-storage';
import {EditDataUser} from '../../components/edit-data-user/edit-data-user';

import {CardBooking} from "../../components/card-booking";
import {BookOrder} from "../../interfaces/interfaces";
import {isOldOrder} from "../../shared/utils/is-old-order";
import {NotOrderBlue} from "../../components/not-order-blue";
import {CardDelivery} from "../../components/card-delivery";
import {CardHistory} from "../../components/card-history";
import {mock} from "../../shared/mosk-delivery-history";
import {NotOrderRed} from "../../components/not-order-red";
import {isOldDelivery} from "../../shared/utils/is-old-delivery";
import {LoadImg} from "../../components/load-img";


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};


export const ProfilePages = () => {
    const userAvatar = useAppSelector(avatarUserSelector);
    const lastNameUser = useAppSelector(lastNameUserSelector);
    const firstNameUser = useAppSelector(firstNameUserSelector);
    const booking = useAppSelector(bookingSelector);
    const deliveryMock =  mock.delivery;
    const historyMock = mock.history;
    const deliveryState =  useAppSelector(deliverySelector);
    const historyState = useAppSelector(historySelector);
    const delivery = deliveryState ||  deliveryMock;
    const history = historyState || historyMock;


    return (
        <section data-test-id='main-page'>
            <div className={st.wrapper}>
                <div className={st.container__item_user} data-test-id='profile-avatar'>
                    <LoadImg/>
                    <div >
                        <p className={st.name_user}>{lastNameUser || getLocalStorage('firstName') as string || 'user'}</p>
                        <p className={st.name_user}>{firstNameUser || getLocalStorage('lastName') as string || 'user'}</p>
                    </div>
                </div>
                <div>
                    <p className={st.title}>Учётные данные</p>
                    <p className={st.title__description}>Здесь вы можете отредактировать информацию о себе</p>
                </div>
                <EditDataUser/>
                <div className={st.container__inform_booking}>

                    <div className={st.container__order_book}>
                        <p className={st.title}>Забронированная книга</p>
                        <p className={st.title__description}>Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь</p>
                        <div className={st.container__order}>
                            {!booking?.order && <NotOrderBlue title = 'Забронируйте книгу и она отобразится'/>}
                            {booking?.order && <CardBooking/>}
                            {isOldOrder(booking?.dateOrder) && <NotOrderRed title = 'Дата бронирования книги истекла'
                            text='Через 24 часа книга будет  доступна всем'/>}
                        </div>
                    </div>


                    <div className={st.container__order_book}>
                        <p className={st.title}>Книга которую взяли</p>
                        <p className={st.title__description}>Здесь можете просмотреть информацию о книге и узнать сроки возврата</p>
                        <div className={st.container__order}>
                            {!delivery?.handed &&  <NotOrderBlue title = 'Прочитав книгу, она отобразится в истории'/>}
                            {delivery?.handed && <CardDelivery/>}
                            {isOldDelivery(delivery?.dateHandedTo) && <NotOrderRed title = 'Вышел срок пользования книги '
                                                                            text='Верните книгу, пожалуйста'/>}
                        </div>
                    </div>

                    <div className={st.container__order_book} data-test-id='history'>
                        <p className={st.title}>История</p>
                        <p className={st.title__description}>Список прочитанных книг</p>
                        <div className={st.container__order} >
                            {!history?.books && <NotOrderBlue title = 'Вы не читали книг из нашей библиотеки'/>}
                            {history?.books && <div className={st.container__slider}>
                                <Carousel
                                    arrows={false}
                                    swipeable={false}
                                    draggable={false}
                                    showDots={true}
                                    responsive={responsive}
                                    ssr={true} // means to render carousel on server-side.
                                    infinite={true}
                                    autoPlay={false}
                                    keyBoardControl={true}
                                    customTransition="all .7"
                                    transitionDuration={500}
                                    containerClass="carousel-container"
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                   // deviceType={this.props.deviceType}
                                    dotListClass="dot__style"
                                    itemClass='carousel__item'
                                    renderDotsOutside={true}
                                >
                                    {history?.books && history?.books.map((book: BookOrder) => <CardHistory  key={crypto.randomUUID()} bookHistory={book}/>)}
                                </Carousel>

                                </div>}

{//  или этот слайдер <div className={st.container__order} >  <SliderHistory/>  </div>//
}

                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}
