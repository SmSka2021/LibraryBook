import {RootState} from '../store';

export const searchItemSelector =(state: RootState) => state.sortBooks.searchItems;
export const sortUpSelector = (state: RootState) => state.sortBooks.isSortUp;
