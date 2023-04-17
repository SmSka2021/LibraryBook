import React from 'react';
import {useParams} from 'react-router-dom';
import st from './set-rating-message.module.css';
import {SetRatingStars} from '../set-rating-stars';
import {
    setCountFromUser,
    setIsShowRatingModal,
    setReviewFromUser
} from '../../store/reducers/one-book-reducer';
import {useAppDispatch} from '../../store/store';
import {useAppSelector} from '../../store/selectors/hook';
import {
    countStarsFromUserSelector,
    idBookHistorySelector,
    idBookOneSelector,
    idCommentSelector,
    isItUpdateCommentSelector,
    isShowRatingModalSelector,
    reviewFromUserSelector,
    setOneBookHistoryCheckSelector
} from '../../store/selectors/one-book-state-selectors';
import {TextareaChange} from '../../interfaces/interfaces';
import {fetchCreateComment} from '../../store/thunks/create-comment-thunk';
import {idUserSelector} from '../../store/selectors/user-state-selectors';
import {getLocalStorage} from '../../shared/utils/save-local-storage';
import {fetchUpdateComment} from "../../store/thunks/update-comment-thunk";



export const SetRatingMessage = () => {
    const countStarsFromUser = useAppSelector(countStarsFromUserSelector)
    const isShowModal = useAppSelector(isShowRatingModalSelector);
    const reviewUser = useAppSelector(reviewFromUserSelector);
    const idOneBook = useAppSelector(idBookOneSelector);
    const idOneBookHistory = useAppSelector(idBookHistorySelector);
    const isItUpdateComment = useAppSelector(isItUpdateCommentSelector);
    const idUpdateComment = useAppSelector(idCommentSelector);


    const idUser = useAppSelector(idUserSelector);
    const params = useParams();


    const dispatch = useAppDispatch();
    const dispatchApi = useAppDispatch();
    const closeMessage = () => {
        dispatch(setIsShowRatingModal({isShow: false}))
        dispatch(setReviewFromUser({review: ''}));
        dispatch(setCountFromUser({countStars: 0}));
    }
    const setReviewUser = (event: TextareaChange) => {
        dispatch(setReviewFromUser({review: event.target.value}));
    }
    const createComment = () => {
        const dataComment= {
            rating: countStarsFromUser,
            text: reviewUser,
            book: params.bookId ? `${idOneBook}` : `${idOneBookHistory}`,
            user:  idUser ? `${idUser}` : getLocalStorage('idUser') as string,
        }
            dispatchApi(fetchCreateComment({data: dataComment}));
            closeMessage();
    }
    const updateComment = () => {
        const item = {
            fetchData: {
                data: {
                    rating: countStarsFromUser,
                    text: reviewUser,
                    book: `${idOneBook}`,
                    user: idUser ? `${idUser}` : getLocalStorage('idUser') as string,
                },
            },
            idComment: idUpdateComment as number,
        }

        console.log(item)
        dispatchApi(fetchUpdateComment(item));
        closeMessage();
    }

   return (
        <div className={st.message__container}
             style={{display: isShowModal ? 'flex' : 'none'}}
             data-test-id='modal-rate-book'>
            <button type='button'
                    data-test-id='modal-close-button'
                    className={st.btn_close} onClick={closeMessage}>x</button>
            <h3 className={st.message__title}  data-test-id='modal-title'>{isItUpdateComment ? 'Хотите изменить оценку?' : 'Оцените книгу'}</h3>
            <p className={st.message__text}>Ваша оценка</p>
           <SetRatingStars/>
            <textarea className={st.text_area}
                      data-test-id='comment'
                      placeholder='Оставить отзыв' value={reviewUser}
                      onChange={setReviewUser}> </textarea>
           <button type='button'
                   data-test-id='button-comment'
                   className={st.message__btn}
                   // disabled={!countStarsFromUser || !reviewUser }
                   onClick={isItUpdateComment ? updateComment : createComment}>Оценить</button>
        </div>

    );
}



