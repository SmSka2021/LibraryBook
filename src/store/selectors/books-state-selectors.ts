import {RootState} from '../store';

export const isLoaderBookSelector = (state: RootState) => state.booksState.showLoader;
export const countBookCategorySelector = (state: RootState) => state.booksState.countCategoryBook;
export const statusFetchBooksSelector = (state: RootState) => state.booksState.status;
export const allBooksSelector = (state: RootState) => state.booksState.books;
export const idCheckBookSelector = (state: RootState) => state.booksState.idCheckBook;
export const dateOrderCheckBookSelector = (state: RootState) => state.booksState.dateOrderCheckBook;

export const checkBookSelector = (state: RootState) => state.booksState.checkBook;
export const idBookingCheckBookSelector = (state: RootState) => state.booksState.checkBook?.booking?.id;
