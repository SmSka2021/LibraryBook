import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import st from './book-page.module.css';
import imgNotBook from '../../assets/img/imageNotBook.jpg';
import {formattedDate} from '../../shared/utils/formated-date';
import {Rating} from '../../components/rating';
import {InfoTable} from '../../components/info-table';
import {Review} from '../../components/reviews';
import btnUp from '../../assets/icon/icon_btn_up_dark.svg';
import btnDown from '../../assets/icon/icon_down_btn_dark.svg';
import {Slider} from '../../components/slider';
import {useAppDispatch} from '../../store/store';
import {fetchOneBook} from '../../store/thunks/one-book-thunk';
import {converterUrlImg} from '../../shared/utils/converter-url-img-for-slider';
import {baseUrl} from '../../shared/constants/url';
import {categoryBookPath} from '../../shared/utils/converter-category-book';
import {fetchBooks} from '../../store/thunks/books-thunk';
import {setSearchItems} from '../../store/reducers/sort-books-reducer';
import {isAuth} from '../../shared/utils/save-local-storage';
import {idUserSelector, isAuthSelector} from '../../store/selectors/user-state-selectors';
import {
    oneBookErrorSelector,
    oneBookSelector,
    successAddCommentOneSelector, successFetchOneBookSelector,
    successUpdateCommentOneBookSelector
} from '../../store/selectors/one-book-state-selectors';
import {
    categoriesSelector,
    checkedCategorySelector
} from '../../store/selectors/category-books-selectors';
import {CommentsOneBook} from '../../interfaces/interfaces';
import {useAppSelector} from '../../store/selectors/hook';
import {
    setIsFetchUpdateComment,
    setIsShowRatingModal,
    setIsShowResetOrderModal,
    setOpenOrderModal
} from '../../store/reducers/one-book-reducer';
import {sortCommentByTime} from '../../shared/utils/sort-comments-by-time';
import {isCommentUser} from "../../shared/utils/is-comment-user";
import {isBookBusyUser} from "../../shared/utils/is-book-busy-user";

import {SliderBig, MobileSlider} from '../../components/sliders'




export const BookPage = () => {
    const [isShowReview, setIsShowReview] = useState<boolean>(true);
    const isAuthState = useAppSelector(isAuthSelector);
    const oneBookError = useAppSelector(oneBookErrorSelector);
    const oneBook = useAppSelector(oneBookSelector);
    const categories = useAppSelector(categoriesSelector);
    const checkedCategory = useAppSelector(checkedCategorySelector);
    const successAddCommentOne = useAppSelector(successAddCommentOneSelector) === 'success';
    const successUpdateCommentOneBook = useAppSelector(successUpdateCommentOneBookSelector) === 'success';
    const successFetchOneBook = useAppSelector(successFetchOneBookSelector) === 'success';

    const idUser = useAppSelector(idUserSelector);
    const param = useParams();
    const {bookId = '2'} = param;
    const dispatch = useAppDispatch();
    const dispatchHooks = useDispatch()
    const isAuthUser = isAuthState || isAuth();
    const navigate = useNavigate();
    const {id, category} = useParams()
    const sortComments = oneBook?.comments?.length ? sortCommentByTime([...oneBook.comments]) : oneBook?.comments

    const categoryForCrumbs = categories.find(el => el.path === category)?.name

    useEffect(() => {
        if (successAddCommentOne || successUpdateCommentOneBook) {

            dispatch(fetchOneBook(bookId));
        }
    }, [dispatch, successAddCommentOne, successUpdateCommentOneBook, bookId]);

    useEffect(() => {
        if (!isAuthUser) navigate('/auth');
    }, [isAuthUser, navigate])

    useEffect(() => {
        const promise = dispatch(fetchOneBook(bookId));

        return () => {
            promise.abort()
        }

    }, [dispatch, bookId,]);
    const fetchBooksNew = () => {
        dispatchHooks(setSearchItems({searchItems: ''}))
        dispatch(fetchBooks());
    }
    const statusBook = () => {
        if (!oneBook?.booking?.order && !oneBook?.delivery?.handed) return 'free';
        if (isBookBusyUser(oneBook, idUser) && oneBook?.booking?.order) return 'order_user';
        return 'busy';
    }

    const openModalUpdateComment = () => {
        dispatch(setIsShowRatingModal({isShow: true}))
        dispatch(setIsFetchUpdateComment({updateComment: true}));
    }
    const openModalCreateComment = () => {
        dispatch(setIsShowRatingModal({isShow: true}))
        dispatch(setIsFetchUpdateComment({updateComment: false}));
    }
    const openCreateOrder = (event: React.MouseEvent | React.KeyboardEvent) => {
        event.stopPropagation();
        const elem = event.target as HTMLButtonElement;
        if (elem.getAttribute('data-status-id') === 'free') {
            dispatch(setOpenOrderModal())
        }
        if (elem.getAttribute('data-status-id') === 'order_user') {
            dispatch(setIsShowResetOrderModal({show: true}))
        }
    }
    if (!successFetchOneBook) {
        return (<div> </div>)
    }
    if (oneBookError || !successFetchOneBook) {

        return (
            <main className={st.main}>
                <section className={st.information}>
                    <div className={st.container__link_info}>
                        <div className={st.link_info}>
                            <Link className={st.link_item}
                                  onClick={fetchBooksNew}
                                  data-test-id='breadcrumbs-link'
                                  to={checkedCategory ? `/books/${categoryBookPath(categories, checkedCategory)}` : '/books/all'}>
                                {categoryForCrumbs? categoryForCrumbs : 'Все книги'}

                            </Link>
                            <span className={st.link_item}>/</span>
                            <h6 data-test-id='book-name'
                                className={st.link_item}>{Object.keys(oneBook!)?.length > 0 && oneBook!.title}</h6>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main className={st.main}>
            <section className={st.information}>
                <div className={st.container__link_info}>
                    <div className={st.link_info}>
                        <Link className={st.link_item}
                              onClick={fetchBooksNew}
                              data-test-id='breadcrumbs-link'
                              to={checkedCategory ? `/books/${categoryBookPath(categories, checkedCategory)}` : '/books/all'}>
                            {categoryForCrumbs? categoryForCrumbs : 'Все книги'}
                        </Link>
                        <span className={st.link_item}> / </span>
                        <h6 data-test-id='book-name'
                            className={st.link_item}>{(oneBook  && Object.keys(oneBook!)?.length > 0) && oneBook!.title}</h6>
                    </div>
                </div>




                <div className={st.container__book}>

                    <div >
                        {oneBook?.images ?
                            <div className={st.container__slider}>{window.innerWidth > 824 ?
                                <SliderBig/> : <MobileSlider/>}</div> :
                            <div className={st.container__book_img}><img  className={st.book__img} src={imgNotBook} alt="cat"/></div>}
                    </div>




                    <div className={st.container__book_info}>
                        <div className={st.container__book_title}>
                            <p data-test-id='book-title'
                               className={st.book__title}>{oneBook?.title}</p>
                            <p className={st.book__author}>{`${oneBook?.authors?.join(', ')}, ${oneBook?.issueYear}`}</p>
                        </div>
                        <div className={st.container__book_about}>
                            <button type='button'
                                    className={
                            `${st.btn} 
                             ${(!oneBook?.booking?.order && !oneBook?.delivery?.handed) ? st.btn_free : ''}
                             ${(isBookBusyUser(oneBook, idUser) && oneBook?.booking?.order) ? st.btn_order_user : ''}
                             ${(!isBookBusyUser(oneBook, idUser) && oneBook?.booking?.order) ? st.btn_order : ''}                         
                             ${oneBook?.delivery?.handed ? st.btn_busy : ''}`}
                                    data-status-id={statusBook()}
                                    data-test-id='booking-button'
                                    onClick={(event: React.MouseEvent) => openCreateOrder(event)}
                                    disabled={oneBook?.delivery?.handed || (oneBook?.booking?.order && !isBookBusyUser(oneBook, idUser))}>

                                {oneBook?.delivery?.handed && !oneBook?.booking?.order && `занята до ${formattedDate(oneBook.delivery?.dateHandedTo)}`}
                                {oneBook?.booking?.order && !oneBook?.delivery?.handed && 'забронирована'}
                                {oneBook?.delivery?.handed && oneBook?.booking?.order && `занята до ${formattedDate(oneBook.delivery?.dateHandedTo)}`}
                                {(!oneBook?.delivery?.handed && !oneBook?.booking?.order) && 'забронировать'}

                            </button>
                            <div className={st.block__info}>
                                <h5 className={st.info_title}>О книге</h5>
                                <p className={st.info_text}>{oneBook?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={st.statistic}>
                <div className={st.container__rating}>
                    <h5 className={st.info_title}>Рейтинг</h5>
                    <hr className={st.line}/>
                    <div
                        className={oneBook?.rating ? st.container__stars_count : st.container__stars_not_count}>
                        <Rating rating={oneBook?.rating} ratingBook={true}/>
                        {oneBook?.rating ?
                            <span className={st.stars_count}>{oneBook?.rating}</span>
                            : <span className={st.stars_zero}>ещё нет оценок</span>}
                    </div>
                </div>
                <div className={st.container__information}>
                    <h5 className={st.info_title}>Подробная информация</h5>
                    <hr className={st.line}/>
                    <InfoTable/>
                </div>
                <div className={st.container__review}>
                    <div className={st.review_title}>
                        <h5 className={st.info_title}>Отзывы</h5>
                        <span
                            className={st.review_count}>{(oneBook?.comments && oneBook?.comments?.length) ? oneBook?.comments?.length : '0'}</span>
                        <button className={st.review_btn}
                                type='button'
                                data-test-id='button-hide-reviews'
                                onClick={() => setIsShowReview(!isShowReview)}>
                            <img src={isShowReview ? btnUp : btnDown} alt='icon btn'/>
                        </button>
                    </div>
                    {isShowReview && <hr className={st.line}/>}
                </div>
                <div data-test-id='reviews'>
                    {isShowReview && sortComments && sortComments.length && sortComments?.map((comment: CommentsOneBook) =>
                        <Review key={comment.id} review={comment}/>)}

                    {sortComments?.length && isCommentUser(sortComments) ?
                        <button type='button'
                            data-test-id='button-rate-book'
                            onClick={openModalUpdateComment}
                            className={`${st.btn_review_update} ${st.btn_review}`}
                            style={isShowReview ? {} : {marginTop: '42px'}}> Изменить оценку
                        </button>
                      :  <button type='button'
                                 data-test-id='button-rate-book'
                                 onClick={openModalCreateComment}
                                 className={st.btn_review}
                                 style={isShowReview ? {} : {marginTop: '42px'}}> Оценить книгу
                         </button>
                    }
                </div>
            </section>
        </main>
    );
}
