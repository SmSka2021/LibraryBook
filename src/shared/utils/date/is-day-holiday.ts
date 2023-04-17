import {DayOfWeek} from "../../../interfaces/interfaces";

export const isDayHoliday = (day: DayOfWeek) =>  day.dayNumberInWeek === 1 || day.dayNumberInWeek === 7;
