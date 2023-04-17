import {DayOfWeek} from '../../../interfaces/interfaces';

export  const checkDateOrderBook = (day: DayOfWeek, dataOrderCheckBook: string): boolean => {
    const dayOrderBook = new Date(dataOrderCheckBook as string).getDate();
    const monthOrderBook = new Date(dataOrderCheckBook as string).getMonth();
    const yearOrderBook = new Date(dataOrderCheckBook as string).getFullYear();

   const isDay = dayOrderBook === day.dayNumber;
    const isMonth = monthOrderBook === day.monthIndex;
    const isYear = yearOrderBook === day.year;
    const res = isDay && isMonth && isYear;
    return (res);
 }