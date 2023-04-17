import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import st from './message-registration.module.css';
import {useAppDispatch} from '../../store/store';
import {
    setNotErrorAuth,
    setIsShowAuth,
    setStepsRegistration, setIsShowMessage, setResetMessageUser
} from '../../store/reducers/user-data-reducer';
import {fetchRegistrationUser} from '../../store/thunks/registration-thunk';
import {fetchResetPassword} from '../../store/thunks/reset-password-thunk';
import {
    dataMessageSelector,
    dataNewPasswordSelector,
    dataUserSelector, isShowMessageSelector
} from '../../store/selectors/user-state-selectors';

import {useAppSelector} from '../../store/selectors/hook';


export const MessageRegistration = () => {
    const {action, btnTitle, textMessage, titleMessage} =  useAppSelector(dataMessageSelector);

    const dataNewPassword = useAppSelector(dataNewPasswordSelector);
    const dataUser = useAppSelector(dataUserSelector);
    const isShowMessage = useAppSelector(isShowMessageSelector);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dispatchApi = useAppDispatch();
    const closeErrorMessage = () => {
        switch (action) {
            case 'repeat':
                dispatchApi(fetchRegistrationUser(dataUser));
                break;
            case 'back':
                dispatch(setStepsRegistration({step:'1'}));
                break;
            case 'enter':
                navigate('/auth');
                break;
            case 'authError':
                dispatch(setIsShowAuth());
                dispatch(setNotErrorAuth());
                break;
            case 'repeatFetchNewPassword':
                dispatchApi(fetchResetPassword(dataNewPassword));
                break;
        }
        dispatch(setIsShowMessage({isShowMessage: false}));
        dispatch(setResetMessageUser);
    }

   return (
        <div className={st.message__container}
             data-test-id='status-block'
             style={{display: isShowMessage ? 'flex' : 'none'}}>
            <h3 className={st.message__title}>{titleMessage}</h3>
            <p className={st.message__text}>{textMessage}</p>
            {action !== 'notAction' && <button type='button' className={st.message__btn} onClick={closeErrorMessage}>{btnTitle}</button>}
        </div>
    );
}



