import React, {useCallback, useEffect, useMemo} from 'react';
import {redirect, useNavigate} from 'react-router-dom';
import {Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useAppSelector} from '../../store/selectors/hook';

import './slider-big.css';

import 'swiper/css';
import 'swiper/css/pagination';
import {BookOrder} from "../../interfaces/interfaces";
import {CardHistory} from "../card-history";
import {mock} from "../../shared/mosk-delivery-history";
import {deliverySelector, historySelector} from "../../store/selectors/user-state-selectors";

export const SliderHistory = () => {
    const historyMock = mock.history;
    const deliveryState =  useAppSelector(deliverySelector);
    const historyState = useAppSelector(historySelector);
    const history = historyState || historyMock;


    return (
        <div >
            <Swiper
                data-test-id='slide-big'
                spaceBetween={30}
                slidesPerView={4}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    history?.books && history?.books.map((book: BookOrder) => (
                        <SwiperSlide  key={crypto.randomUUID()} data-test-id='history-slide' >
                            <CardHistory   bookHistory={book}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

