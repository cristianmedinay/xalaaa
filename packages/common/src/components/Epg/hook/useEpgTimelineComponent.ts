/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimeHelper } from "../../../helpers";
import { useEpgDay, useEpgScrollContainerDispatch } from "../context";

export const useEpgTimelineComponent = () => {
  const { hoursInDay } = useEpgDay();
  const { onScrollToDate } = useEpgScrollContainerDispatch();

  const hours = new Array(hoursInDay).fill("");

  const prepareDate = (index: number, half?: boolean): Date => {
    const baseDate = TimeHelper.format(
      TimeHelper.getCurrentDateTime(),
      "YYYY-MM-DD"
    );

    const time = index < 10 ? `0${index}` : index;

    return TimeHelper.getDateTime(
      `${baseDate}T${time}:${half ? "30" : "00"}:00`
    );
  };

  const formatTime = (index: number, half?: boolean) =>
    TimeHelper.format(prepareDate(index, half), "HH:mm");

  const onScrollToHour = (index: number, half?: boolean) =>
    onScrollToDate(prepareDate(index, half));

  return {
    hours,
    formatTime,
    onScrollToHour,
  };
};
