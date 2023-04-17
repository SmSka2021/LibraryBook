import {useCallback, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {Footer} from '../components/footer';
import {Header} from '../components/header';
import st from './layuot.module.css';
import {useAppDispatch} from '../store/store'
import {Error} from '../components/error_message';
import {Loader} from '../components/loader';
import {fetchBooks} from '../store/thunks/books-thunk';
import {fetchCategoriesBooks} from '../store/thunks/category-books-thunk';
import {resizeScreen} from '../store/reducers/resize-screen-reduser';
import {getLocalStorage, isAuth, isJwt} from '../shared/utils/save-local-storage';
import {
    idAvatarUserSelector, idUserSelector,
    isAuthSelector,
    isJwtSelector, isShowMessageAvatarSelector,
    successFetchAvatarSelector, successUpdateUserSelector
} from '../store/selectors/user-state-selectors';
import {
    isShowRatingModalSelector,
    isShowResetOrderSelector,
    isSuccessDeleteOrderSelector,
    showErrorSelector,
    showOrderModalSelector,
    showSuccessSelector,
    statusFetchOneBookSelector,
    successAddCommentHistorySelector,
    successAddCommentOneSelector,
    successUpdateCommentHistorySelector
} from '../store/selectors/one-book-state-selectors';
import {statusFetchBooksSelector} from '../store/selectors/books-state-selectors';
import {statusFetchCategorySelector} from '../store/selectors/category-books-selectors';
import {useAppSelector} from '../store/selectors/hook';
import {MessageFetchResult} from '../components/message-fetch-result';
import {WrapperModal} from "../components/wraper-modal";
import {fetchProfileUser} from "../store/thunks/profile-thunk";
import {fetchEditAvatar} from "../store/thunks/edit-avatar-thunk";




export const Layout = () => {
    const isShowModalRating = useAppSelector(isShowRatingModalSelector);
    const isShowModalOrder = useAppSelector(showOrderModalSelector);
    const isShowModalResetOrder = useAppSelector(isShowResetOrderSelector);
    const isShowWrapper = isShowModalRating || isShowModalOrder || isShowModalResetOrder;
    const isShowMessageAvatar = useAppSelector(isShowMessageAvatarSelector);
    const isAuthState = useAppSelector(isAuthSelector);
    const statusFetchOneBook = useAppSelector(statusFetchOneBookSelector);
    const statusFetchBooks = useAppSelector(statusFetchBooksSelector);
    const statusFetchCategory = useAppSelector(statusFetchCategorySelector);
    const successFetch = useAppSelector(showSuccessSelector);
    const idAvatar = useAppSelector(idAvatarUserSelector);
    const isErrorBooks = statusFetchBooks === 'failed';
    const isErrorCategory = statusFetchCategory === 'failed';
    const isErrorOneBook = statusFetchOneBook === 'failed';
    const isJwtItem = useAppSelector(isJwtSelector) || isJwt();
    const isShowModalReset = useAppSelector(isShowResetOrderSelector);
    const successFetchAvatar = useAppSelector(successFetchAvatarSelector);
    const successFetchDeleteOder = useAppSelector(isSuccessDeleteOrderSelector) === 'true';
    const successUpdateUser = useAppSelector(successUpdateUserSelector) === 'success';
    const successAddCommentHistory = useAppSelector(successAddCommentHistorySelector) === 'success';
    const successUpdateCommentHistory = useAppSelector(successUpdateCommentHistorySelector) === 'success';



    const isAuthUser = isAuthState || isAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const idUser = useAppSelector(idUserSelector);
    const isShowError = isErrorBooks || isErrorCategory || isErrorOneBook;

    const successMessage = useAppSelector(showSuccessSelector);
    const errorMessage = useAppSelector(showErrorSelector);
    const isShowMessageResultFetch = successMessage || errorMessage || isShowMessageAvatar;

    const saveSizeScreenStore = useCallback(() => {
        dispatch(resizeScreen({size: window.innerWidth }));
    },[dispatch]);

    useEffect(() => {
        window.addEventListener('resize', saveSizeScreenStore);

        return () => {
            window.removeEventListener('resize', saveSizeScreenStore);
        }
    }, [saveSizeScreenStore]);


     useEffect(()=>{
         if(!isAuthUser)  navigate('/auth');
     },[isAuthUser, navigate]);


    useEffect(() => {
        if(isAuthUser) dispatch(fetchBooks());
    },[isAuthUser, dispatch, isJwtItem, successFetch]);

    useEffect(() => {
       if(successFetch) dispatch(fetchBooks());
    },[isAuthUser, dispatch, isJwtItem, successFetch]);

    useEffect(() => {
        if(isAuthUser) dispatch(fetchCategoriesBooks());
    },[isAuthUser, dispatch, isJwtItem]);

    useEffect(() => {
        if( (isAuthUser && isJwtItem)) dispatch(fetchProfileUser());
    },[ isAuthUser, isJwtItem, dispatch]);

    useEffect(() => {
        if(successFetchDeleteOder) dispatch(fetchProfileUser());
    },[ successFetchDeleteOder, dispatch]);

    useEffect(() => {
        if( successUpdateUser) dispatch(fetchProfileUser());
    },[  successUpdateUser, dispatch]);

    useEffect(() => {
        if( successAddCommentHistory) dispatch(fetchProfileUser());
    },[  successAddCommentHistory, dispatch]);

    useEffect(() => {
        if( successUpdateCommentHistory) dispatch(fetchProfileUser());
    },[  successUpdateCommentHistory, dispatch]);



    useEffect(() => {
        if(successFetchAvatar === 'success') {
            dispatch(fetchEditAvatar({
                avatar: { avatar: idAvatar},
                id: idUser ? `${idUser}` : getLocalStorage('idUser') as string,
            }))
        }
    },[successFetchAvatar, dispatch, idAvatar, idUser]);



    if(!isAuthUser ||  !isJwtItem) return <Loader/>

    return (
            <div className={st.container}>
                {isShowWrapper && <WrapperModal/>}
                {isShowMessageResultFetch && <MessageFetchResult/>}
                {isShowError  &&  <Error />}
                <Loader />
                <Header />
                <Outlet/>
                <Footer/>
            </div>
    )
}



