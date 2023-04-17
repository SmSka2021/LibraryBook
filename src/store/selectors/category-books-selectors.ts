import {RootState} from '../store';


export const categoriesSelector = (state: RootState) => state.categoryBooks.categoryBooks;
export const checkedCategorySelector =  (state: RootState) => state.categoryBooks.checkedCategory;
export const isLoaderCategorySelector =  (state: RootState) => state.categoryBooks.showLoader;
export const statusFetchCategorySelector =  (state: RootState) => state.categoryBooks.status;
