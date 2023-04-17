import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import imgNotBook from '../../assets/img/imageNotBook.jpg';
import st from './card-history.module.css';
import {baseUrl} from '../../shared/constants/url';
import {BookOrder, CommentsOneBook} from '../../interfaces/interfaces';
import {setIsShowRatingModal,
    setIdBookHistory,
    setIsFetchUpdateComment,
} from '../../store/reducers/one-book-reducer';
import {fetchOneBook} from '../../store/thunks/one-book-thunk';
import {useAppDispatch} from '../../store/store';
import {getLocalStorage} from '../../shared/utils/save-local-storage';
import {useAppSelector} from '../../store/selectors/hook';
import {idUserSelector} from '../../store/selectors/user-state-selectors';





export const CardHistory = (props:{bookHistory: BookOrder}) => {
    const book = props.bookHistory;
    const dispatch = useDispatch();
    const dispatchApi = useAppDispatch();
    const idUserStore = useAppSelector(idUserSelector);
    const  idUser  = idUserStore ||  +(getLocalStorage('idUser') as string);
    const navigate = useNavigate();
    const updateComment = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.stopPropagation();
        dispatchApi(fetchOneBook(  `${book.id}`))
        dispatch(setIsFetchUpdateComment({updateComment: true}));
        dispatch(setIsShowRatingModal({isShow: true}));
        // dispatch(setOneBookHistoryCheck({oneBookHistory: book}));

         }
    const createComment = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.stopPropagation();
        dispatch(setIdBookHistory({idBookHistory: book.id}))
        dispatch(setIsFetchUpdateComment({updateComment: false}));
        dispatch(setIsShowRatingModal({isShow: true}));
    }

    const openCard = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.stopPropagation();
        const elem = event.target as HTMLElement;
        const isBtn = elem.hasAttribute('type');
        if (isBtn) return;
        navigate(`/books/all/${book.id}`);

    }

    return (
        <div data-test-id='history-slide'
             role='presentation'
             onKeyDown={(event: React.KeyboardEvent) => openCard(event)}
             onMouseDown={(event: React.MouseEvent) => openCard(event)}
             className={`${st.container__card} ${st.container__card_table}`}   >
            <img loading='lazy' className={st.card__img}
                 src={book.image ? `${baseUrl}${book.image}` : imgNotBook}
                 alt='img book'/>
            <div className={st.container__card_info}>
                <div
                    className={st.card__container_title}>
                    <p className={st.card__title}>{book.title}</p>
                    <p className={st.card__author}>{`${book.authors.join(', ')}, ${book.issueYear}`}</p>
                </div>
                {!book.rating && <button type='button'
                        className={`${st.btn} ${st.btn_free}`}
                        onClick={(event: React.MouseEvent) => createComment(event)}
                        data-test-id='history-review-button'
                >Оставить отзыв</button>}
                {book.rating && <button type='button'
                        className={`${st.btn} ${st.btn_order_user}`}
                        onClick={(event: React.MouseEvent) => updateComment(event)}
                        data-test-id='history-review-button'
                >Изменить оценку</button>}
            </div>
        </div>

    );
}
