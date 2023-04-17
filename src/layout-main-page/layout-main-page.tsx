import {Outlet} from 'react-router-dom';
import {Navigate} from '../components/navigate';
import st from './layuot-main-page.module.css';
import {SCREEN_HIDE_NAV} from '../shared/constants/const-breakpoint';
import {statusFetchCategorySelector} from '../store/selectors/category-books-selectors';
import {statusFetchBooksSelector} from '../store/selectors/books-state-selectors';
import {sizeScreenSelector} from '../store/selectors/resize-screen-selectors';
import {useAppSelector} from '../store/selectors/hook';


export const LayoutMainPage = () => {
    const statusFetchCategory = useAppSelector(statusFetchCategorySelector);
    const statusFetchBooks = useAppSelector(statusFetchBooksSelector);
    const sizeScreen= useAppSelector(sizeScreenSelector);
    const succeededFetchCategory = statusFetchCategory === 'succeeded';
    const succeededFetchBooks = statusFetchBooks === 'succeeded';

    return (
        <main className={st.main} data-test-id='main-page'>
            {sizeScreen >= SCREEN_HIDE_NAV && <Navigate dataId='' navigationBurger='navigation'/>}
            { succeededFetchBooks && succeededFetchCategory && <Outlet/>}
        </main>
    );
}
