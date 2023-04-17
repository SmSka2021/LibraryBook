import React from 'react';
import st from './wrapper-modal.module.css';
import {
    setCloseOrderModal,
    setCountFromUser,
    setIsShowRatingModal, setIsShowResetOrderModal,
    setReviewFromUser
} from '../../store/reducers/one-book-reducer';
import {useAppDispatch} from '../../store/store';
import {useAppSelector} from '../../store/selectors/hook';
import {
    isShowRatingModalSelector, isShowResetOrderSelector, showOrderModalSelector,
} from '../../store/selectors/one-book-state-selectors';
import {SetRatingMessage} from '../set-rating-message';
import {OrderBookFirst} from '../order-book-first';
import {ResetOrderBook} from '../reset-order-book';




export const WrapperModal = () => {
    const isShowModalRating = useAppSelector(isShowRatingModalSelector);
    const isShowModalOrder = useAppSelector(showOrderModalSelector);
    const isShowModalReset = useAppSelector(isShowResetOrderSelector);
    const dispatch = useAppDispatch();
    // const isShowModal = isShowModalRating || isShowModalOrder || isShowModalReset;
        const closeMessage = () => {
        dispatch(setIsShowResetOrderModal({show:false}))
        dispatch(setIsShowRatingModal({isShow: false}))
        dispatch(setReviewFromUser({review: ''}));
        dispatch(setCountFromUser({countStars: 0}));
        dispatch(setCloseOrderModal())
    }
    const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
        const el = event.target as HTMLDivElement;
        if(el.getAttribute('data-test-id') === 'modal-outer') closeMessage();
    }

   return (
       <div className={st.wrapper}
            // style={{display: isShowModal ? 'flex' : 'none'}}
            role='presentation'
            data-test-id='modal-outer'
            onClick={closeModal}>
           {isShowModalRating && <SetRatingMessage/>}
           {isShowModalOrder && <OrderBookFirst/>}
           {isShowModalReset && <ResetOrderBook/>}
       </div>
    );
}



