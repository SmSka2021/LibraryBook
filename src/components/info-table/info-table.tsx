import st from './info-table.module.css';
import {category1, category2} from '../../shared/constants/list-category';
import {oneBookSelector} from '../../store/selectors/one-book-state-selectors';
import {useAppSelector} from '../../store/selectors/hook';




export const InfoTable = () => {
    const oneBook = useAppSelector(oneBookSelector);
    const  items1: Array<string | undefined> = [
        oneBook?.publish, oneBook?.issueYear, oneBook?.pages, oneBook?.cover, oneBook?.format
    ]
    const  items2: Array<string | undefined> = [
        oneBook?.categories[0], oneBook?.weight, oneBook?.ISBN, oneBook?.producer
    ]


    return (
        <div className={st.info__container}>
            <div className={st.container1}>
                <ul className={st.category__container1}>
                    {category1.map((category:string) =>
                        <li key={crypto.randomUUID()} className={st.category}>{category}</li>)}
                </ul>
                <ul className={st.item__container1}>
                    {items1 && items1.map((item) => <li key={crypto.randomUUID()} className={st.item}>{item}</li>)}
                </ul>
            </div>
            <div className={st.container2}>
                <ul className={st.category__container2}>
                    {category2.map((category)=> <li key={crypto.randomUUID()} className={st.category}>{category}</li>)}
                </ul>
                <ul className={st.item__container1}>
                    {items2.map((item) => <li key={crypto.randomUUID()} className={st.item}>{item}</li>)}
                </ul>
            </div>
        </div>
    );
}





