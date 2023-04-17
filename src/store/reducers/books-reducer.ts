import {createSlice} from '@reduxjs/toolkit'
import {CountCategory, IBook} from '../../interfaces/interfaces';
import {fetchBooks} from '../thunks/books-thunk';

export interface BooksState {
    books: IBook[];
    checkBook: IBook | null;
    error: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    showLoader: boolean;
    countCategoryBook: CountCategory;
    idCheckBook: number;
    dateOrderCheckBook: string;
}

const initialState: BooksState = {
    books:[],
    error: false,
    status: 'idle',
    showLoader: false,
    countCategoryBook: {},
    idCheckBook: 0,
    dateOrderCheckBook: '',
    checkBook: null,
}

export const booksSlice = createSlice({
    name: 'booksSlice',
    initialState,
    reducers: {
        setCheckBook: (state: BooksState, action) => {
            /* eslint-disable no-param-reassign */
            state.checkBook =action.payload.checkBook
        },
        setIdCheckBook: (state: BooksState, action) => {
            /* eslint-disable no-param-reassign */
            state.idCheckBook =action.payload.idBook
        },
        setDateOrderCheckBook: (state: BooksState, action) => {
            /* eslint-disable no-param-reassign */
            state.dateOrderCheckBook =action.payload.order;
        },
        setBooks: (state: BooksState, action) => {
            /* eslint-disable no-param-reassign */
            state.books = [...action.payload.books]
        },
        setStatusFetchBooks: (state: BooksState, action) => {
            /* eslint-disable no-param-reassign */
            state.status =action.payload.status
        },
        setErrorBooks: (state: BooksState, action) => {
            /* eslint-disable no-param-reassign */
            state.error =action.payload.error
        },
        setCountCategoryBook: (state:BooksState, action) => {
            /* eslint-disable no-param-reassign */
            state.countCategoryBook =action.payload.countCategory
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchBooks.pending, (state: BooksState)=> {
            state.showLoader = true;
            state.status = 'loading';
            state.error = false;
        })
        builder.addCase(fetchBooks.fulfilled, (state: BooksState, {payload}) => {
            state.books = [...payload.allBooks];
            state.countCategoryBook = payload.countCategoryBooks;
            state.showLoader = false;
            state.status = 'succeeded';
            state.error = false;
        })
        builder.addCase(fetchBooks.rejected, (state: BooksState) => {
            state.showLoader = false;
            state.status = 'failed';
            state.error = true;
        })

    }
})

export const {setBooks, setCheckBook, setDateOrderCheckBook, setStatusFetchBooks, setErrorBooks, setIdCheckBook}  = booksSlice.actions
