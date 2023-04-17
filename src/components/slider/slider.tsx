import {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperClass from 'swiper/types/swiper-class';
import {FreeMode, Pagination, Scrollbar, Thumbs} from 'swiper';
import './style.css';
import {SCREEN_XL} from '../../shared/constants/const-breakpoint';
import {sizeScreenSelector} from '../../store/selectors/resize-screen-selectors';
import {useAppSelector} from '../../store/selectors/hook';


export const Slider = (props: { urlImg: string[] }) => {
    const {urlImg} = props;
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
    const sizeScreen = useAppSelector(sizeScreenSelector)
    if (sizeScreen > SCREEN_XL) {
        return (
            <section>
                <Swiper
                    spaceBetween={10}
                    thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
                    modules={[FreeMode, Thumbs]}
                    className='mySwiper2'
                    data-test-id='slide-big'
                >
                    {urlImg.map((url, index) => (
                        <SwiperSlide key={url} virtualIndex={index}>
                            <img src={url} alt='book'  />
                        </SwiperSlide>
                    ))}

                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    scrollbar={{ draggable: true }}
                    spaceBetween={10}
                    slidesPerView={2}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Scrollbar, Thumbs]}
                    className='mySwiper'
                >

                    {urlImg.map((url, index) => (
                        <SwiperSlide
                            data-test-id='slide-mini'
                            key={url} virtualIndex={index}>
                            <img src={url} alt='book'/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        )
    }
    return (
        <Swiper
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className='mySwiper3'
            data-test-id='slide-big'
        >
            {urlImg.map((url, index) => (
                <SwiperSlide
                    data-test-id='slide-mini'
                    key={url} virtualIndex={index}>
                    <img src={url} alt='book'/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
