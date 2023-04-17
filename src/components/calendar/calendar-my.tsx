import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import st from './calendar.module.css';
import {useCalendar} from './hooks/use-calendar';
import {
    canOrderDayArr,
    checkDateIsEqual, checkDateOrderBook,
    checkIsToday,
    isDayHoliday
} from '../../shared/utils/date';
import {useAppDispatch} from '../../store/store';
import {setArrCanOrderDay} from '../../store/reducers/one-book-reducer';
import {CalendarProps, DayOfWeek} from '../../interfaces/interfaces';
import {useAppSelector} from '../../store/selectors/hook';
import {
    dateOrderSelector,
    isShowResetOrderSelector,
    showSuccessSelector
} from '../../store/selectors/one-book-state-selectors';
import arrowList from '../../assets/icon/arrow_list.svg';
import {dateOrderCheckBookSelector} from '../../store/selectors/books-state-selectors';


export const CalendarMy: React.FC<CalendarProps> = ({
                                                      locale = 'default',
                                                      selectedDate: date,
                                                      selectDate,
                                                      firstWeekDayNumber = 2
                                                  }) => {
    const {functions, state} = useCalendar({
        locale,
        selectedDate: date,
        firstWeekDayNumber
    });
    const isOpenResetOrderModal = useAppSelector(isShowResetOrderSelector);
    const [countClick, setCountClick] = useState(0);
    const successOrderBook = useAppSelector(showSuccessSelector);
    const dataOrderOneBook = useAppSelector(dateOrderSelector);
    const dataOrderCheckBook = useAppSelector(dateOrderCheckBookSelector);
    const params = useParams();

    useEffect(() => {
        if (successOrderBook) setCountClick(0)
    }, [successOrderBook]);

    useEffect(() => {
        if (isOpenResetOrderModal) setCountClick(1)
    }, [isOpenResetOrderModal]);


    const dispatch = useAppDispatch();
    const arrCanOrderDays = canOrderDayArr(state.calendarDays);
    const setArrOrderDayInStore = () => {
        dispatch(setArrCanOrderDay({arrDays: arrCanOrderDays}))
    }
   const checkDateOrder = (day: DayOfWeek): boolean => {
       if (params.bookId) return  checkDateOrderBook(day, dataOrderOneBook as string);
       return checkDateOrderBook(day, dataOrderCheckBook as string);
    }



    return (
        <div className={st.calendar} data-test-id='calendar'>
            <div className={st.calendar__header}>

                <button  type='button'
                         className={st.container__header_month}
                         data-test-id='month-select'
                         onClick={() => functions.setMode('months')}>
                    <span> {state.monthsNames[state.selectedMonth.monthIndex].month} {state.selectedYear} </span>
                    <img src={arrowList} alt='calendar'/>
                </button>

                <div className={st.container_arrow}>
                    <div
                        data-test-id='button-prev-month'
                        aria-hidden='true'
                        className={st.calendar__header__arrow__left}
                        onClick={() => functions.onClickArrow('left')}
                    />
                    <div
                        data-test-id='button-next-month'
                        aria-hidden='true'
                        className={st.calendar__header__arrow__right}
                        onClick={() => functions.onClickArrow('right')}
                    />
                </div>
            </div>
            <div className={st.calendar__body}>
                {state.mode === 'days' && (
                    <React.Fragment>
                        <div className={st.calendar__week__names}>
                            {state.weekDaysNames.map((weekDaysName) => (
                                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                            ))}
                        </div>
                        <div className={st.calendar__days}>
                            {state.calendarDays.map((day) => {
                                const isToday = checkIsToday(day.date);
                                const canOrder = arrCanOrderDays.includes(day.dayNumber);
                                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date) && canOrder && countClick;
                                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
                                const isHoliday = isDayHoliday(day) && !isAdditionalDay;
                                const isTodayHoliday = isToday && isHoliday;
                                const isDateOrder = checkDateOrder(day) && (countClick === 0);

                                return (
                                    <span
                                        key={`${day.dayNumber}-${day.monthIndex}`}
                                        data-test-id='day-button'
                                        aria-hidden='true'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCountClick(1);
                                            functions.setSelectedDay(day);
                                            selectDate(day.date);
                                            setArrOrderDayInStore()
                                        }}
                                        className={`
                                            ${st.calendar__day}
                                            ${isToday ? st.calendar__today__item : ''}
                                            ${isHoliday ? st.calendar__day__holiday : ''}
                                            ${canOrder ? st.calendar__day__order : ''}
                                            ${isTodayHoliday ? st.calendar__today__holiday : ''}
                                            ${isSelectedDay ? st.calendar__selected__item : ''}
                                            ${isDateOrder ? st.calendar__selected__item : ''}
                                            ${isAdditionalDay ? st.calendar__additional__day : ''}`
                                        }
                                    >
                                        {day.dayNumber}
                                    </span>
                                );
                            })}
                        </div>
                    </ React.Fragment>
                )}

                {state.mode === 'months' && (
                    <div className={st.calendar__pick__items__container}>
                        {state.monthsNames.map((monthsName) => {

                            const isCurrentMonth =
                                new Date().getMonth() === monthsName.monthIndex &&
                                state.selectedYear === new Date().getFullYear();
                            const isSelectedMonth = monthsName.monthIndex === state.selectedMonth.monthIndex;

                            return (
                                <div
                                    key={monthsName.month}
                                    aria-hidden='true'
                                    onClick={() => {
                                        functions.setSelectedMonthByIndex(monthsName.monthIndex);
                                        functions.setMode('days');
                                    }}
                                    className={`
                                        ${st.calendar__pick__item}
                                        ${isSelectedMonth ? st.calendar__selected__item : ''}
                                        ${isCurrentMonth ? st.calendar__today__item : ''}`
                                    }>
                                    {monthsName.monthShort}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
