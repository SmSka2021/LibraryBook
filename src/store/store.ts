import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {visibleMenuSlice} from './reducers/visible-menu-reduser';
import {resizeScreenSlice} from './reducers/resize-screen-reduser';
import {booksSlice} from './reducers/books-reducer';
import {categorySlice} from './reducers/category-reducer';
import {oneBookSlice} from './reducers/one-book-reducer';
import {sortBooksSlice} from './reducers/sort-books-reducer';
import {userDataSlice} from './reducers/user-data-reducer';



export const store = configureStore({
    reducer: {
        visibleMenu: visibleMenuSlice.reducer,
        resizeScreen: resizeScreenSlice.reducer,
        booksState: booksSlice.reducer,
        categoryBooks: categorySlice.reducer,
        oneBook: oneBookSlice.reducer,
        sortBooks: sortBooksSlice.reducer,
        userState: userDataSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

/*
store.subscribe(() => console.log(store.getState()))
store.dispatch(openMenu())
store.dispatch(closeMenu())
*/
