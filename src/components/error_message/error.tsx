import {useDispatch} from 'react-redux';
import st from './error.module.css';
import icon from '../../assets/icon/errorSimbol.svg';
import {setStatusFetchOneBook} from '../../store/reducers/one-book-reducer';
import {setStatusFetchBooks} from '../../store/reducers/books-reducer';
import {setStatusFetchCategory} from '../../store/reducers/category-reducer';

export const Error = () => {
    const dispatch = useDispatch();
    const closeErrorMessage = () => {
        dispatch(setStatusFetchOneBook({status: 'idle'}));
        dispatch(setStatusFetchBooks({status: 'idle'}));
        dispatch(setStatusFetchCategory({status: 'idle'}));
    }

   return (
        <div  className={st.error__container} data-test-id='error'>
            <img src={icon} alt='icon error'/>
            <h2 className={st.error__text}>Что-то пошло не так. Обновите страницу через некоторое время.</h2>
            <button type='button' className={st.error__btn} onClick={closeErrorMessage}>X</button>
        </div>
    );
}



