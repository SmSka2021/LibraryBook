import {useDispatch} from 'react-redux';
import {useState} from 'react';
import st from './set-rating-stars.module.css';
import {
    countStarsFromUserSelector, isItUpdateCommentSelector
} from '../../store/selectors/one-book-state-selectors';
import {useAppSelector} from '../../store/selectors/hook';
import {setCountFromUser} from '../../store/reducers/one-book-reducer';
import star1 from '../../assets/icon/star1.png';
import star0 from '../../assets/icon/star0.png';

export const SetRatingStars = () => {
    const [isHoverStar1, setIsHoverStar1] = useState(false);
    const [isHoverStar2, setIsHoverStar2] = useState(false);
    const [isHoverStar3, setIsHoverStar3] = useState(false);
    const [isHoverStar4, setIsHoverStar4] = useState(false);
    const [isHoverStar5, setIsHoverStar5] = useState(false);
    const starsUser = useAppSelector(countStarsFromUserSelector);
    const stars = starsUser || 5;

    const dispatch = useDispatch();

    const setStars = (count: number) => {
        dispatch(setCountFromUser({countStars: count}));
    }

   const setHover = (id:number) => {
        switch (id) {
            case 1:
                setIsHoverStar1(true);
                break;
            case 2:
                setIsHoverStar1(true);
                setIsHoverStar2(true);
                break;
            case 3:
                setIsHoverStar1(true);
                setIsHoverStar2(true);
                setIsHoverStar3(true);
                break;
            case 4:
                setIsHoverStar1(true);
                setIsHoverStar2(true);
                setIsHoverStar3(true);
                setIsHoverStar4(true);
                break;
            case 5:
                setIsHoverStar1(true);
                setIsHoverStar2(true);
                setIsHoverStar3(true);
                setIsHoverStar4(true);
                setIsHoverStar5(true);
                break;
        }
        }

    const resetHover = (id:number) => {
        switch (id) {
            case 1:
                setIsHoverStar1(false);
                break;
            case 2:
                setIsHoverStar1(false);
                setIsHoverStar2(false);
                break;
            case 3:
                setIsHoverStar1(false);
                setIsHoverStar2(false);
                setIsHoverStar3(false);
                break;
            case 4:
                setIsHoverStar1(false);
                setIsHoverStar2(false);
                setIsHoverStar3(false);
                setIsHoverStar4(false);
                break;
            case 5:
                setIsHoverStar1(false);
                setIsHoverStar2(false);
                setIsHoverStar3(false);
                setIsHoverStar4(false);
                setIsHoverStar5(false);
                break;
        }
    }
   return (
            <div className={st.container__stars} data-test-id='rating'>
                <button data-test-id='star'
                        type='button'
                        className={`${st.btn__star} ${(isHoverStar1 || (stars >= 1))&& st.btn__star_red}`}
                        onClick={()=> stars === 1 ? setStars(0) : setStars(1)}
                        onMouseEnter={()=> setHover(1)} onMouseLeave={()=> resetHover(1)}>
                    { (stars<1 /* && !isHoverStar1 */) &&  <img className={st.img_star} src={star0} alt='stars'/>}
                    { (stars>=1 /* || isHoverStar1 */ ) && <img data-test-id='star-active' className={st.img_star} src={star1} alt='stars'/>}

                </button>
                <button data-test-id='star'
                    type='button' className={`${st.btn__star} ${(isHoverStar2 || (stars >= 2))&& st.btn__star_red}`}
                        onClick={()=> setStars(2)}
                        onMouseEnter={()=> setHover(2)} onMouseLeave={()=> resetHover(2)}>
                    { (stars<2  /* && !isHoverStar2 */ ) &&  <img className={st.img_star} src={star0} alt='stars'/>}
                    { (stars>=2 /* || isHoverStar2 */) && <img data-test-id='star-active' className={st.img_star} src={star1} alt='stars'/>}

                </button>
                <button data-test-id='star'
                    type='button' className={`${st.btn__star} ${(isHoverStar3 || (stars >= 3))&& st.btn__star_red}`}
                        onClick={()=> setStars(3)}
                        onMouseEnter={()=> setHover(3)} onMouseLeave={()=> resetHover(3)}>
                    { (stars<3 /* && !isHoverStar3 */) &&  <img className={st.img_star} src={star0} alt='stars'/>}
                    { (stars>=3 /* || isHoverStar3 */) && <img data-test-id='star-active' className={st.img_star} src={star1} alt='stars'/>}

                </button>
                <button data-test-id='star'
                    type='button' className={`${st.btn__star} ${(isHoverStar4 || (stars >= 4))&& st.btn__star_red}`}
                        onClick={()=> setStars(4)}
                        onMouseEnter={()=> setHover(4)} onMouseLeave={()=> resetHover(4)}>
                    { (stars<4 /* && !isHoverStar4 */) &&  <img className={st.img_star} src={star0} alt='stars'/>}
                    { (stars>=4 /* || isHoverStar4 */) && <img data-test-id='star-active' className={st.img_star} src={star1} alt='stars'/>}

                </button>
                <button data-test-id='star'
                    type='button' className={`${st.btn__star} ${(isHoverStar5 || (stars === 5))&& st.btn__star_red}`}
                        onClick={()=> setStars(5)}
                        onMouseEnter={()=> setHover(5)} onMouseLeave={()=> resetHover(5)}>
                    { (stars<5 /* && !isHoverStar5 */) &&  <img className={st.img_star} src={star0} alt='stars'/>}
                    { (stars>=5 /* || isHoverStar5 */) && <img data-test-id='star-active' className={st.img_star} src={star1} alt='stars'/>}

                </button>
            </div>

    );
}



