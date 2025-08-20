/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimeHelper } from "../../../helpers";

interface calculateDayParams {
  dayWidth: number;
  startDate: Date;
  endDate: Date;
}

interface calculateDayValue {
  hourWidth: number;
  dayWidth: number;
  hoursInDay: number;
  startOfDayOffsetHours: number;
}

export const calculateDay = (params: calculateDayParams): calculateDayValue => {
  const { dayWidth: customDayWidth, startDate, endDate } = params;

  if (endDate < startDate) {
    console.error("Value of endDate must be greater than startDate");
  }

  const startOfDayOffsetHours = startDate.getHours();
  const hoursInDay = TimeHelper.diff(endDate, startDate, "hours");
  const hourWidth = Math.floor(customDayWidth / hoursInDay);
  const dayWidth = hourWidth * hoursInDay;

  return {
    hourWidth: Math.abs(hourWidth),
    dayWidth: Math.abs(dayWidth),
    hoursInDay: Math.abs(hoursInDay),
    startOfDayOffsetHours: Math.abs(startOfDayOffsetHours),
  };
};
