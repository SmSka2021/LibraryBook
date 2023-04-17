import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import st from './message-fetch-result.module.css';
import icon from '../../assets/icon/errorSimbol.svg';
import iconSuccess from '../../assets/icon/Icon_success.svg';
import {setCloseModal} from '../../store/reducers/one-book-reducer';
import {setCloseMessageAvatar} from '../../store/reducers/user-data-reducer';
import {useAppSelector} from '../../store/selectors/hook';
import {
    messageUserAboutFetchSelector,
    showErrorSelector,
    showSuccessSelector
} from '../../store/selectors/one-book-state-selectors';
import {
    isShowMessageAvatarSelector,
    successFetchAvatarSelector,
    successFetchUpdateAvatarSelector,
    successUpdateUserSelector,
    textMessageAvatarSelector
} from "../../store/selectors/user-state-selectors";


export const MessageFetchResult = () => {
    const textMessage = useAppSelector(messageUserAboutFetchSelector);
    const successMessage = useAppSelector(showSuccessSelector);
    const errorMessage = useAppSelector(showErrorSelector);
    const isShowMessageAvatar = useAppSelector(isShowMessageAvatarSelector);
    const textMessageAvatar = useAppSelector(textMessageAvatarSelector);
    const successUpdateUser = useAppSelector(successUpdateUserSelector);
    const successFetchAvatar = useAppSelector(successFetchUpdateAvatarSelector);

    const conditionDisplay = successMessage || errorMessage || isShowMessageAvatar;
    const errorStyle = (successFetchAvatar === 'error') || (successUpdateUser==='error') || errorMessage;
    const successStyle = (successFetchAvatar === 'success') || (successUpdateUser==='success') || successMessage;
   
    const dispatch = useDispatch();
    const closeMessage = () => {
        dispatch(setCloseModal());
        dispatch(setCloseMessageAvatar())
    }
    useEffect(() => {
        if(conditionDisplay) {
            setTimeout(() => {
                dispatch(setCloseModal());
            }, 5000);
        }

    },[conditionDisplay, dispatch]);

   return (
        <div data-test-id='error'
             // style={{display: conditionDisplay ? 'flex' : 'none'}}
             className={
            `${st.container}
             ${successStyle ?  st.success__container : ''}          
             ${errorStyle ? st.error__container : ''}
             `}>
            <img src={(errorStyle) ? icon : iconSuccess} alt='icon message'/>
            <h2 className={st.error__text}>{isShowMessageAvatar ? textMessageAvatar : textMessage}</h2>
            <button  data-test-id='alert-close' type='button' className={st.error__btn} onClick={closeMessage}>X</button>
        </div>
    );
}



