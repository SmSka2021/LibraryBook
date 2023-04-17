import {CommentsOneBook} from '../../interfaces/interfaces';
import st from './review.module.css';
import avatar from '../../assets/icon/user_review.png';
import {Rating} from '../rating';
import {formattedDateRu} from '../../shared/utils/formated-date';
import {baseUrl} from '../../shared/constants/url';


export const Review = (props: { review: CommentsOneBook }) => (
        <div className={st.container} data-test-id='comment-wrapper'>
            <div className={st.container__name}>
                <img src={props.review?.user?.avatarUrl ? `${baseUrl}${props.review?.user?.avatarUrl}` : avatar} alt='avatar' className={st.avatar}/>
                <div className={st.container__item}>
                    <div data-test-id='comment-author' className={st.item}>{'Фёдор Сумкин' || `${props.review?.user?.firstName} ${props.review?.user?.lastName}`}</div>
                    <div data-test-id='comment-date' className={st.item}>{'19 января 2023' || formattedDateRu(props.review?.createdAt)}</div>
                </div>

            </div>
            <Rating ratingBook={false} rating={4 || props.review.rating}/>
            <p data-test-id='comment-text' className={st.review__txt}>{props.review.text}</p>
        </div>
    );





