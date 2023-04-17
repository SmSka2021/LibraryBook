import { createSlice } from '@reduxjs/toolkit'

export interface SortBooksState {
    isSortUp: boolean;
    searchItems: string;
}

const initialState: SortBooksState = {
    isSortUp: false,
    searchItems: '',
}

export const sortBooksSlice = createSlice({
    name: 'sortBooks',
    initialState,
    reducers: {
        setIsSortUp: (state: SortBooksState) => {
            /* eslint-disable no-param-reassign */
            state.isSortUp = !state.isSortUp;
        },
        setSearchItems: (state: SortBooksState, action) => {
            /* eslint-disable no-param-reassign */
            state.searchItems = action.payload.searchItems;
        },
    }
})

export const { setIsSortUp, setSearchItems } = sortBooksSlice.actions
