import {useState} from 'react';
import {useParams} from 'react-router-dom';
import st from './reset-order-book.module.css';
import {useAppDispatch} from '../../store/store';
import {useAppSelector} from '../../store/selectors/hook';
import {
    arrCanOrderDateSelector,
    dateOrderSelector,
    idBookingOneBookSelector,
    idBookOneSelector,
} from '../../store/selectors/one-book-state-selectors';
import {setIsShowResetOrderModal} from '../../store/reducers/one-book-reducer';
import {
    dateOrderCheckBookSelector, idBookingCheckBookSelector,
    idCheckBookSelector
} from '../../store/selectors/books-state-selectors';
import {fetchDeleteOrderBook} from '../../store/thunks/delete-order-book-thunk';
import {fetchUpdateOrderBook} from '../../store/thunks/update-order-book-thunk';
import {CalendarMy} from '../calendar';
import {idUserSelector} from '../../store/selectors/user-state-selectors';
import {getLocalStorage} from "../../shared/utils/save-local-storage";



export const ResetOrderBook = () => {

    const daysForOrder = useAppSelector(arrCanOrderDateSelector);
    const idCheckBook = useAppSelector(idCheckBookSelector);
    const idOneBook = useAppSelector(idBookOneSelector);

    const idBookingOneBook = useAppSelector(idBookingOneBookSelector);
    const idBookingCheckBook = useAppSelector(idBookingCheckBookSelector);

    const dateOrderFromOneBook = useAppSelector(dateOrderSelector) as string;
    const dateOrderFromAllBook = useAppSelector(dateOrderCheckBookSelector)
    const [selectedDate, setSelectedDay] = useState(new Date());
    const dispatch = useAppDispatch();
    const dispatchApi = useAppDispatch();
    const params = useParams();
    const idUser = useAppSelector(idUserSelector);

     const isDisabledBtn = () => {
         const checkDay = new Date(selectedDate).getDate();
         const dayFromAllBook = new Date(dateOrderFromAllBook).getDate();
         const dayFromOneBook = new Date(dateOrderFromOneBook).getDate();

         if(daysForOrder.includes(checkDay)){
             if(dayFromAllBook && checkDay === dayFromAllBook) return true;
             if(dayFromOneBook && checkDay === dayFromOneBook) return true;

             return false;
         }

         return true;
     }
    const closeModal = () => {
        dispatch(setIsShowResetOrderModal({show:false}))
    }

    const updateOrderBookFetch = () => {
         const dataFetch = {
             fetchData: {
                 data: {
                     order: true,
                     dateOrder: new Date(selectedDate),
                     book: `${idCheckBook}`,
                     customer: idUser ? `${idUser}` : getLocalStorage('idUser') as string,
                 }
             },
             idBooking: idBookingCheckBook as number,
             }

         if(params.bookId) {
             dataFetch.fetchData.data.book = `${idOneBook}`;
             dataFetch.idBooking = idBookingOneBook as number;
         }
         dispatchApi(fetchUpdateOrderBook(dataFetch));
         closeModal();
    }

    const deleteOrderBookFetch = () => {

        if(params.bookId) {
            dispatchApi(fetchDeleteOrderBook(idBookingOneBook as number));
        }  else {
            dispatchApi(fetchDeleteOrderBook(idBookingCheckBook as number));
        }
        closeModal();
    }

   return (
        <div className={st.message__container}
            //  style={{display: isShowModal ? 'flex' : 'none'}}
             data-test-id='booking-modal'>
            <button type='button'
                    data-test-id='modal-close-button'
                    className={st.btn_close} onClick={closeModal}>x</button>
            <h3 className={st.message__title}  data-test-id='modal-title'>Изменение даты <br/>бронирования</h3>
            <CalendarMy selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)}/>
           <button type='button'
                   data-test-id='booking-button'
                   className={` ${st.btn}   ${st.btn_order} `}
                    disabled={isDisabledBtn()}
                   onClick={updateOrderBookFetch}
                   >Забронировать</button>
            <button type='button'
                    data-test-id='booking-cancel-button'
                    className={`
                   ${st.btn}
                    ${st.btn_reset}
                    `}
                    onClick={deleteOrderBookFetch}
            >Отменить бронь</button>
        </div>
    );
}



