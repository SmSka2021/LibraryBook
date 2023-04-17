import {DayOfWeek} from '../../../interfaces/interfaces';

export const canOrderDayArr = (arrOrder: DayOfWeek[]): number[] => {
    const today = new Date().getDate();
    const thisMonth = new Date().getMonth();
    const dayWeek = new Date().getDay();
    let maxDay = today + 1;

    if(dayWeek === 0) maxDay = today + 1;

    if(dayWeek === 5) maxDay = today + 3;

    if(dayWeek === 6) maxDay = today + 2;

    const res1 = arrOrder.filter((day)=> day.dayNumberInWeek !== 1
        && day.dayNumberInWeek !== 7
        && day.dayNumber <= maxDay
        && day.dayNumber>= today
        && thisMonth === day.monthIndex)

    return res1.map((day) => day.dayNumber)
}
