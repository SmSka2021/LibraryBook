import { useState} from 'react';
import {useParams} from 'react-router-dom';
import {Search} from '../../components/search';
import {CardBook} from '../../components/card';
import st from './main-page.module.css';
import {FuncBoolean, IBook} from '../../interfaces/interfaces';
import {filterBooksToCategory} from '../../shared/utils/filter-books-to-category';
import {sortBooksByRating} from '../../shared/utils/sort-books-by-rating';
import {searchBookByName} from '../../shared/utils/search-book-by-name';
import {
    allBooksSelector,
    countBookCategorySelector
} from '../../store/selectors/books-state-selectors';
import {checkedCategorySelector} from '../../store/selectors/category-books-selectors';
import {searchItemSelector, sortUpSelector} from '../../store/selectors/sort-books-selectors';
import {useAppSelector} from '../../store/selectors/hook';



export const MainPage = () => {
    const [listCheck, isViewCheck] = useState(false);
    const allBooksState = useAppSelector(allBooksSelector);
    const countBookCategory = useAppSelector(countBookCategorySelector);
    const checkedCategory = useAppSelector(checkedCategorySelector);
    const searchItem = useAppSelector(searchItemSelector);
    const sortUp = useAppSelector(sortUpSelector);
    const changeView: FuncBoolean = (childData: boolean) => {
        isViewCheck(childData);
    }

    const allBooksSortRating = sortBooksByRating( allBooksState, sortUp);
    const allBooks = searchBookByName(allBooksSortRating, searchItem)
    const filterBookByCategory = filterBooksToCategory(allBooks!, checkedCategory)
    const params = useParams();
    const pathCategories = params.category;

    return (
        <section className={st.container} >
            <Search changeView={changeView}/>
            <div data-test-id='content'
                className={listCheck ? st.container__books_check : st.container__books}>
                {checkedCategory === '' ?
                    allBooks?.map((book: IBook) => <CardBook key={crypto.randomUUID()}
                                                     listCheck={listCheck}
                                                     bookOne={book}/>)
                :
                    filterBookByCategory.map((book: IBook) => <CardBook key={crypto.randomUUID()} listCheck={listCheck}  bookOne={book}/>)}
                {!countBookCategory[checkedCategory] && pathCategories !== 'all' && <h3 data-test-id='empty-category' className={st.title__not_book}>В этой категории книг ещё нет</h3>}
                {((searchItem && !filterBookByCategory.length && countBookCategory[checkedCategory]) || (searchItem && !allBooks.length && pathCategories === 'all')) && <h3 data-test-id='search-result-not-found' className={st.title__not_book}>По запросу ничего не найдено</h3>}
            </div>
        </section>
    );
}
