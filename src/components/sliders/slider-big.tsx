import {useState} from 'react';
import {Navigation, Thumbs} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {useAppSelector} from '../../store/selectors/hook';

import './slider-big.css'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {oneBookSelector} from "../../store/selectors/one-book-state-selectors";
import {baseUrl} from "../../shared/constants/url";


export const SliderBig = () => {

    const [activeThumb, setActiveThumb] = useState<any>(null)

    const book =  useAppSelector(oneBookSelector);

    const imagesBlock = () => book?.images?.map((item: {url: string}) => (
        <SwiperSlide key={item.url}>
            <img className='img' src={item.url} alt="images Book" data-test-id='slide-mini'/>
        </SwiperSlide>
    ))

    return (
        <div>
            <Swiper
                data-test-id='slide-big'
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Thumbs]}
                grabCursor={true}
                thumbs={{swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null}}
                className='product-images-slider'
            >
                <div>{imagesBlock()}</div>
            </Swiper>
            {(book?.images && book?.images?.length > 1) && <Swiper
                onSwiper={setActiveThumb}
                loop={true}
                spaceBetween={35}
                slidesPerView={5}
                modules={[Navigation, Thumbs]}
                className='product-images-slider-thumbs'
            >
                <div >{imagesBlock()}</div>

            </Swiper>}

        </div>
    );
};


