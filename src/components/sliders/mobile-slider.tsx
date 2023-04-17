import {Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useAppSelector} from '../../store/selectors/hook';
import './slider-big.css';
import 'swiper/css';
import 'swiper/css/pagination';
import {oneBookSelector} from "../../store/selectors/one-book-state-selectors";
import {baseUrl} from "../../shared/constants/url";

export const MobileSlider = () => {
    const book =  useAppSelector(oneBookSelector);

    return (
        <div>
            <Swiper
                data-test-id='slide-big'
                spaceBetween={1}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    book?.images?.map((item: {url: string}) => (
                        <SwiperSlide key={item.url} data-test-id='slide-mini'>
                            <img src={(`${baseUrl}${item.url}`)}
                                 alt="product images"/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>

    )
}
