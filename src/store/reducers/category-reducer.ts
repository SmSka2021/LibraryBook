import {createSlice} from '@reduxjs/toolkit'
import {CategoriesBooks} from '../../interfaces/interfaces';
import {fetchCategoriesBooks} from '../thunks/category-books-thunk';


export interface CategoryState {
    error: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    showLoader: boolean;
    categoryBooks: CategoriesBooks[];
    checkedCategory: string;
}

const initialState: CategoryState = {
    categoryBooks:[],
    error: false,
    status: 'idle',
    showLoader: false,
    checkedCategory: '',
}

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
         setCategory: (state: CategoryState, action) => {
            /* eslint-disable no-param-reassign */
            state.checkedCategory = action.payload.checked
        },

        setErrorCategory: (state: CategoryState, action) => {
            /* eslint-disable no-param-reassign */
            state.error = action.payload.error;
        },
        setStatusFetchCategory: (state:CategoryState, action) => {
            /* eslint-disable no-param-reassign */
            state.status =action.payload.status
        },

    },
    extraReducers: builder => {
        builder.addCase(fetchCategoriesBooks.pending, (state: CategoryState)=> {
            state.showLoader = true;
            state.status = 'loading';
            state.error = false;
        })
        builder.addCase(fetchCategoriesBooks.fulfilled, (state: CategoryState, {payload}) => {
            if(payload.length > 0) {
                state.categoryBooks = [...payload];
            }

            state.showLoader = false;
            state.status = 'succeeded';
            state.error = false;
        })
        builder.addCase(fetchCategoriesBooks.rejected, (state: CategoryState) => {
            state.showLoader = false;
            state.status = 'failed';
            state.error = true;
        })

    }
})

export const {setCategory, setErrorCategory, setStatusFetchCategory}  = categorySlice.actions
