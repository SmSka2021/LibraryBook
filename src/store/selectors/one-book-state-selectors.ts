import {RootState} from '../store';

export const oneBookSelector = (state: RootState) => state.oneBook.book;
export const isLoaderOneBookSelector = (state: RootState) => state.oneBook.showLoader;
export const statusFetchOneBookSelector = (state: RootState) => state.oneBook.status;
export const oneBookErrorSelector = (state: RootState) => state.oneBook.error;
export const isShowRatingModalSelector = (state: RootState) => state.oneBook.isShowRatingModal;
export const countStarsFromUserSelector = (state: RootState) => state.oneBook.countStarsFromUser;
export const reviewFromUserSelector = (state: RootState) => state.oneBook.reviewFromUser;
export const idBookOneSelector = (state: RootState) => state.oneBook.book?.id;
export const showOrderModalSelector = (state: RootState) => state.oneBook.isShowOrderModal;
export const arrCanOrderDateSelector = (state: RootState) => state.oneBook.arrCanOrderDay;

export const showSuccessSelector = (state: RootState) => state.oneBook.showSuccess;
export const showErrorSelector = (state: RootState) => state.oneBook.showError;
export const isShowResetOrderSelector = (state: RootState) => state.oneBook.isShowResetOrderModal;
export const dateOrderSelector = (state: RootState) => state.oneBook.book?.booking?.dateOrder;

export const idBookingOneBookSelector = (state: RootState) => state.oneBook.book?.booking?.id;
export const messageUserAboutFetchSelector = (state: RootState) => state.oneBook.textMessageUser;
export const isSuccessDeleteOrderSelector = (state: RootState) => state.oneBook.isSuccessDeleteOrder;
export const idBookHistorySelector = (state: RootState) => state.oneBook.idBookHistory;
export const successAddCommentHistorySelector = (state: RootState) => state.oneBook.successAddCommentHistory;
export const successAddCommentOneSelector = (state: RootState) => state.oneBook.successAddCommentOneBook;
export const setOneBookHistoryCheckSelector = (state: RootState) => state.oneBook.oneBookHistoryCheck;
export const isItUpdateCommentSelector = (state: RootState) => state.oneBook.isItUpdateComment;
export const idCommentSelector = (state: RootState) => state.oneBook.oneBookHistoryCheckComments?.id;

export const successUpdateCommentHistorySelector = (state: RootState) => state.oneBook.successUpdateCommentHistory;
export const successUpdateCommentOneBookSelector = (state: RootState) => state.oneBook.successUpdateCommentOneBook;
export const successFetchOneBookSelector = (state: RootState) => state.oneBook.successFetchOneBook;




