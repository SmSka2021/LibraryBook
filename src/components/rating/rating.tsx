import st from './rating.module.css';
import {stars} from '../../shared/constants/stars';
import star1 from '../../assets/icon/star1.png';
import star0 from '../../assets/icon/star0.png';
import {randomNumber} from '../../shared/utils/id-unic';

export const Rating = (props: { rating: number | undefined, ratingBook: boolean }) => (

    <div className={st.container__stars} data-test-id='rating'>
        {stars.map((star, index) => (
          <div  data-test-id='star'  key={randomNumber()}>
            { (props.rating && (index + 1 <= props.rating)) ?
              <img data-test-id='star-active'
                   className={`${st.img_star} ${props.ratingBook ? st.img_star_book : ''}`}
                   src={star1}
                   alt='stars' />
              : <img  className={`${st.img_star} ${props.ratingBook ? st.img_star_book : ''}`}
                      src={star0}
                      alt='stars' />}
          </div>
        ))}
    </div>


);




