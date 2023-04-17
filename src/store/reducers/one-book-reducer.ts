import {createSlice} from '@reduxjs/toolkit';
import {fetchOneBook} from '../thunks/one-book-thunk';
import {BookOrder, CommentsOneBook, OneBook} from '../../interfaces/interfaces';
import {fetchCreateComment} from '../thunks/create-comment-thunk';
import {fetchSetOrderBook} from '../thunks/set-order-book-thunk';
import {fetchDeleteOrderBook} from '../thunks/delete-order-book-thunk';
import {
    commentError, commentSuccess,
    errorOrderMessage,
    errorResetOrderMessage, errorUpdateComment, errorUpdateOrderMessage, successOrderMessage,
    successResetOrderMessage, successUpdateComment, successUpdateOrderMessage
} from '../../shared/constants/message-user';
import {fetchUpdateOrderBook} from "../thunks/update-order-book-thunk";
import {getLocalStorage} from "../../shared/utils/save-local-storage";
import {fetchUpdateComment} from "../thunks/update-comment-thunk";


export interface OneBookState {
    book: OneBook | null;
    error: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    showLoader: boolean;
    isShowRatingModal: boolean;
    countStarsFromUser: number;
    reviewFromUser: string;
    showSuccess: boolean;
    showError: boolean;    
    isShowOrderModal: boolean;
    isShowResetOrderModal: boolean;
    arrCanOrderDay: number[];
    textMessageUser: string;
    isSuccessDeleteOrder: string;
    idBookHistory: number;
    successAddCommentHistory: string;
    successAddCommentOneBook: string;
    oneBookHistoryCheck: BookOrder | null,
    oneBookHistoryCheckComments: CommentsOneBook | null | undefined,
    isItUpdateComment: boolean;
    successUpdateCommentHistory: string;
    successUpdateCommentOneBook: string;
    successFetchOneBook: string;

}

const initialState: OneBookState = {
    book: null,
    error: false,
    status: 'idle',
    showLoader: false,
    isShowRatingModal: false,
    countStarsFromUser: 5,
    reviewFromUser: '',
    showSuccess: false,
    showError: false,   
    isShowOrderModal: false,
    isShowResetOrderModal: false,
    arrCanOrderDay: [],
    textMessageUser:'',
    isSuccessDeleteOrder: '',
    idBookHistory: 0,
    successAddCommentHistory: '',
    successAddCommentOneBook: '',
    oneBookHistoryCheck:  null,
    oneBookHistoryCheckComments: null,
    isItUpdateComment: false,
    successUpdateCommentHistory: '',
    successUpdateCommentOneBook: '',
    successFetchOneBook: '',
}

export const oneBookSlice = createSlice({
    name: 'oneBookSlice',
    initialState,
    reducers: {
        setIsFetchUpdateComment: (state: OneBookState, action) => {
            /* eslint-disable no-param-reassign */
            state.isItUpdateComment = action.payload.updateComment;
        },
        setOneBookHistoryComment: (state: OneBookState, action) => {
            /* eslint-disable no-param-reassign */
            state.oneBookHistoryCheckComments = action.payload.comment;
        },
        setOneBookHistoryCheck: (state: OneBookState, action) => {
            /* eslint-disable no-param-reassign */
            state.oneBookHistoryCheck = action.payload.oneBookHistory;
        },
        setIdBookHistory: (state: OneBookState, action) => {
            /* eslint-disable no-param-reassign */
            state.idBookHistory = action.payload.idBookHistory;
        },
        setIsShowResetOrderModal: (state: OneBookState, action) => {
            /* eslint-disable no-param-reassign */
            state.isShowResetOrderModal = action.payload.show;
        },
        setArrCanOrderDay: (state: OneBookState, action) => {
            /* eslint-disable no-param-reassign */
            state.arrCanOrderDay = action.payload.arrDays;
        },      
        setStatusFetchOneBook: (state:OneBookState, action) => {
            /* eslint-disable no-param-reassign */
            state.status =action.payload.status
        },
        setIsShowRatingModal: (state:OneBookState, action) => {
            /* eslint-disable no-param-reassign */
            state.isShowRatingModal =action.payload.isShow;
        },
        setCountFromUser: (state:OneBookState, action) => {
            /* eslint-disable no-param-reassign */
            state.countStarsFromUser =action.payload.countStars;
        },
        setReviewFromUser: (state:OneBookState, action) => {
            /* eslint-disable no-param-reassign */
            state.reviewFromUser =action.payload.review;
        },
        setCloseModal: (state:OneBookState) => {
            /* eslint-disable no-param-reassign */
            state.showSuccess = false;
            state.showError = false;           
        },
        setOpenModalSuccess: (state:OneBookState) => {
            /* eslint-disable no-param-reassign */
            state.showSuccess = true;
        },
        setOpenModalError: (state:OneBookState) => {
            /* eslint-disable no-param-reassign */
            state.showError = true;
        },
        setCloseOrderModal: (state:OneBookState) => {
            /* eslint-disable no-param-reassign */
            state.isShowOrderModal = false;
        },
        setOpenOrderModal: (state:OneBookState) => {
            /* eslint-disable no-param-reassign */
            state.isShowOrderModal = true;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchOneBook.pending, (state: OneBookState)=> {
            state.showLoader = true;
            state.status = 'loading';
            state.error = false;
        })
        builder.addCase(fetchOneBook.fulfilled, (state: OneBookState, {payload}) => {
            if(payload.status === 'error') {
                state.showLoader = false;
                state.status = 'failed';
                state.error = true;
                console.log('Failed to');
                state.successFetchOneBook = 'error';
                return;
            }
            if(payload.book instanceof Array<any>) {
                state.book= payload.book.find((book) => book.id === payload.id)
                if (state.book?.comments && state.book?.comments.length) {
                    state.oneBookHistoryCheckComments = state.book?.comments.find(
                        (comment: CommentsOneBook) => comment?.user?.commentUserId === +(getLocalStorage('idUser') as string))

                }
            } else {
                state.book = {...payload.book};
                if (payload.book.comments && payload.book.comments.length) {
                    state.oneBookHistoryCheckComments = payload.book.comments.find(
                        (comment: CommentsOneBook) => comment?.user?.commentUserId === +(getLocalStorage('idUser') as string))
                }
            }

            state.successFetchOneBook = 'success';
            state.reviewFromUser = state.oneBookHistoryCheckComments?.text || '';
            state.countStarsFromUser = state.oneBookHistoryCheckComments?.rating || 5;
            state.showLoader = false;
            state.status = 'succeeded';
            state.error = false;


        })
        builder.addCase(fetchOneBook.rejected, (state: OneBookState) => {
            state.showLoader = false;
            state.status = 'failed';
            state.error = true;
            state.successFetchOneBook = 'error';
        })
        builder.addCase(fetchCreateComment.pending, (state: OneBookState)=> {
            state.textMessageUser = '';
            state.showLoader = true;
            state.error = false;
            state.showError = false;
            state.showSuccess = false;
            state.successAddCommentHistory = '';
            state.successAddCommentOneBook = '';
        })
        builder.addCase(fetchCreateComment.fulfilled, (state: OneBookState) => {
            state.textMessageUser = commentSuccess.text;
            state.showLoader = false;        
            state.isShowRatingModal = false;
            state.showSuccess = true;
            state.successAddCommentHistory = 'success';
            state.successAddCommentOneBook = 'success';
        })
        builder.addCase(fetchCreateComment.rejected, (state: OneBookState) => {
            state.textMessageUser = commentError.text;
            state.showLoader = false;         
            state.isShowRatingModal = false;
            state.showError = true;
            state.successAddCommentHistory = '';
            state.successAddCommentOneBook = '';
        })

        builder.addCase(fetchSetOrderBook.pending, (state: OneBookState)=> {
            state.textMessageUser = '';
            state.showLoader = true;
            state.error = false;
            state.showSuccess = false;
            state.showError = false;
        })
        builder.addCase(fetchSetOrderBook.fulfilled, (state: OneBookState) => {
            state.textMessageUser = successOrderMessage.text;
            state.showLoader = false;
            state.isShowOrderModal = false;
            state.showSuccess = true;            
        })
        builder.addCase(fetchSetOrderBook.rejected, (state: OneBookState) => {
            state.textMessageUser = errorOrderMessage.text;
            state.showLoader = false;                    
            state.isShowOrderModal = false;
            state.showError = true;
        })


        builder.addCase(fetchDeleteOrderBook.pending, (state: OneBookState)=> {
            state.isSuccessDeleteOrder = '';
            state.showLoader = true;
            state.textMessageUser = '';
            state.error = false;
            state.showSuccess = false;
            state.showError = false;
        })
        builder.addCase(fetchDeleteOrderBook.fulfilled, (state: OneBookState) => {
            state.isSuccessDeleteOrder = 'true';
            state.textMessageUser = successResetOrderMessage.text;
            state.showLoader = false;
            state.isShowResetOrderModal = false;
            state.showSuccess = true;
        })
        builder.addCase(fetchDeleteOrderBook.rejected, (state: OneBookState) => {
            state.isSuccessDeleteOrder = 'false';
            state.textMessageUser = errorResetOrderMessage.text;
            state.showLoader = false;           
            state.isShowResetOrderModal = false;
            state.showError = true;
        })

        builder.addCase(fetchUpdateOrderBook.pending, (state: OneBookState)=> {
            state.showLoader = true;
            state.textMessageUser = '';
            state.error = false;
            state.showSuccess = false;
            state.showError = false;
        })
        builder.addCase(fetchUpdateOrderBook.fulfilled, (state: OneBookState) => {
            state.textMessageUser = successUpdateOrderMessage.text;
            state.showLoader = false;
            state.isShowResetOrderModal = false;
            state.showSuccess = true;
        })
        builder.addCase(fetchUpdateOrderBook.rejected, (state: OneBookState) => {
            state.textMessageUser = errorUpdateOrderMessage.text;
            state.showLoader = false;
            state.isShowResetOrderModal = false;
            state.showError = true;
        })
        builder.addCase(fetchUpdateComment.pending, (state: OneBookState)=> {
            state.textMessageUser = '';
            state.showLoader = true;
            state.showError = false;
            state.showSuccess = false;
            state.successUpdateCommentHistory = '';
            state.successUpdateCommentOneBook = '';
        })
        builder.addCase(fetchUpdateComment.fulfilled, (state: OneBookState) => {
            state.textMessageUser = successUpdateComment.text;
            state.showLoader = false;
            state.isShowRatingModal = false;
            state.showSuccess = true;
            state.successUpdateCommentHistory = 'success';
            state.successUpdateCommentOneBook = 'success';
        })
        builder.addCase(fetchUpdateComment.rejected, (state: OneBookState) => {
            state.textMessageUser = errorUpdateComment.text;
            state.showLoader = false;
            state.isShowRatingModal = false;
            state.showError = true;
            state.successUpdateCommentHistory = 'error';
            state.successUpdateCommentOneBook = 'error';
        })

    }
})

export const {   
    setStatusFetchOneBook,
    setIsShowRatingModal,
    setCountFromUser,
    setReviewFromUser,
    setCloseModal,
    setCloseOrderModal,
    setArrCanOrderDay,
    setOpenOrderModal,
    setIsShowResetOrderModal,
    setIdBookHistory,
    setOneBookHistoryCheck,
    setOneBookHistoryComment,
    setIsFetchUpdateComment
} = oneBookSlice.actions
