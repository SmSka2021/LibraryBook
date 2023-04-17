import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import imgNotBook from '../../assets/img/imageNotBook.jpg';
import st from './card-admin.module.css';
import {useAppSelector} from '../../store/selectors/hook';
import {sizeScreenSelector} from '../../store/selectors/resize-screen-selectors';
import {SCREEN_900} from '../../shared/constants/const-breakpoint';


export const CardAdmin = () => {
    const [isFreeBook, setIsFreeBook] = useState<boolean>(false);
    const sizeScreen = useAppSelector(sizeScreenSelector)
    const navigate = useNavigate();

    return (
        <div className={st.container__card}>
            <img loading='lazy' className={st.card__img}
                 src={imgNotBook}
                 alt='img book'/>
                <div  className={st.card__container_title}>
                    <p className={st.card__title}>Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих</p>
                    <p className={st.user_name}>
                        Пользователь:
                        <span className={ st.card__user_red}> Коробейников Илья</span>
                    </p>
                    {isFreeBook && <p className={`${st.card__info} ${st.medium}`}>
                        Срок:
                        <span className={ st.card__user_black}>  17.04.2021-</span>
                        <span className={ st.card__user_black}>24.04.2021</span>
                    </p>}
                    {!isFreeBook && <p className={`${st.card__info} ${st.medium}`}>
                        Дата:
                        <span className={st.card__user_black}>  17.04.2021</span>
                    </p>}
                    <p className={st.card__info}>
                        Статус:
                        <span className={ st.card__user_black}>  Выдана</span>
                    </p>
                    <div className={`${st.container__btn} ${!isFreeBook && (sizeScreen <= SCREEN_900) && st.container__btn_relative}`}>
                        {isFreeBook && <button type='button'  className={ `${st.btn} ${st.card__btn_free} `}>Выдать</button>}

                        {!isFreeBook && <button type='button'  className={ `${st.btn} ${st.card__btn_order}`}>Отметка о возврате</button>}
                        {!isFreeBook && <button type='button'  className={ `${st.btn} ${st.card__btn_free} `}>Продлить</button>}
                    </div>
                </div>
        </div>
    );
}
