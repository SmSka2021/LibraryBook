import {useState} from 'react';
import {useParams} from 'react-router-dom';
import st from './order-book-first.module.css';
import {useAppDispatch} from '../../store/store';
import {useAppSelector} from '../../store/selectors/hook';
import {
    arrCanOrderDateSelector, idBookOneSelector,
} from '../../store/selectors/one-book-state-selectors';
import {setCloseOrderModal} from '../../store/reducers/one-book-reducer';
import {fetchSetOrderBook} from '../../store/thunks/set-order-book-thunk';
import {idCheckBookSelector} from '../../store/selectors/books-state-selectors';
import {CalendarMy} from '../calendar';
import {idUserSelector} from '../../store/selectors/user-state-selectors';
import {getLocalStorage} from "../../shared/utils/save-local-storage";


export const OrderBookFirst = () => {
    const today = new Date();
    const [selectedDate, setSelectedDay] = useState(today);    
    const daysForOrder = useAppSelector(arrCanOrderDateSelector);
    const idCheckBook = useAppSelector(idCheckBookSelector);
    const idOneBook = useAppSelector(idBookOneSelector);
    const idUser = useAppSelector(idUserSelector);

    const dispatch = useAppDispatch();
    const dispatchApi = useAppDispatch();
    const params = useParams();
    const isDisabledBtn = () => {
        const checkDay = new Date(selectedDate).getDate();

        return daysForOrder.includes(checkDay)
    }
    const closeModal = () => {
        dispatch(setCloseOrderModal())
    }

    const createOrderBookFetch = () => {

        const dataOrder = {
            order: true,
            dateOrder:  new Date(selectedDate),
            book: `${idCheckBook}`,
            customer: idUser ? `${idUser}` : getLocalStorage('idUser') as string,
        }

        if (params.bookId) {
            dataOrder.book = `${idOneBook}`;
        }
        dispatchApi(fetchSetOrderBook({data: dataOrder}));
        closeModal();
    }

    return (
            <div className={st.message__container}
                 data-test-id='booking-modal'>
                <button type='button'
                        data-test-id='modal-close-button'
                        className={st.btn_close} onClick={closeModal}>x
                </button>
                <h3 className={st.message__title} data-test-id='modal-title'>Выбор даты <br/>бронирования</h3>
                <CalendarMy selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)}/>
                <button type='button'
                        data-test-id='booking-button'
                        className={st.message__btn}
                        disabled={!isDisabledBtn()}
                        onClick={createOrderBookFetch}
                >Забронировать
                </button>
            </div>
    );
}



