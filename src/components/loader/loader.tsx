import st from './loader.module.css';
import {isLoaderBookSelector} from '../../store/selectors/books-state-selectors';
import {isLoaderCategorySelector} from '../../store/selectors/category-books-selectors';
import {isLoaderOneBookSelector} from '../../store/selectors/one-book-state-selectors';
import {isShowLoaderAuthSelector} from '../../store/selectors/user-state-selectors';
import {useAppSelector} from '../../store/selectors/hook';


export const Loader = () => {
    const isLoaderBook = useAppSelector(isLoaderBookSelector);
    const isLoaderCategory = useAppSelector(isLoaderCategorySelector);
    const isLoaderOneBook = useAppSelector(isLoaderOneBookSelector);
    const isShowLoaderAuth = useAppSelector(isShowLoaderAuthSelector);
    const isShowLoader = isLoaderBook || isLoaderCategory || isLoaderOneBook || isShowLoaderAuth;

    return (
        <div data-test-id='loader' className={st.container__loader} style={{display: isShowLoader ? 'flex' : 'none'}}>
            <span className={st.loader}> </span>
        </div>
    );
}




