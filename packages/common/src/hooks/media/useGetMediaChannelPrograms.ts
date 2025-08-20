/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { MediaDayTimeFilter } from "../../enums";
import { useMediaChannelProgramsByIdSelector } from "../../selectors";
import { MediaStore } from "../../store";

const DEFAULT_PAGE_SIZE = 12;

export const useGetMediaChannelPrograms = (
  channelId: number,
  dateFrom: string,
  daysTo: number,
  pageSize = DEFAULT_PAGE_SIZE,
  dayTime: MediaDayTimeFilter = MediaDayTimeFilter.AllDay
) => {
  const dispatch = useDispatch();

  const channel = useMediaChannelProgramsByIdSelector(channelId);

  const isLoading = channel.IsLoading;
  const pageNumber = channel?.PageNumber || 1;
  const listLength = channel?.Media?.length || 0;
  const haveNextPage = listLength < (channel.TotalCount || 0);

  const getFirstPage = useCallback(() => {
    if (Object.keys(channel).length === 0 && typeof channelId === "number") {
      dispatch(
        MediaStore.Actions.getMediaChannelPrograms({
          MediaOptions: {
            DateFrom: dateFrom,
            DayTime: dayTime,
            DaysCount: daysTo,
            MediaIds: [channelId],
          },
          PageSize: pageSize,
          PageNumber: 1,
        })
      );
    }
  }, [dispatch, channel, channelId]);

  const getNextPage = useCallback(() => {
    if (channelId !== 0) {
      dispatch(
        MediaStore.Actions.getMediaChannelPrograms({
          MediaOptions: {
            DateFrom: dateFrom,
            DayTime: dayTime,
            DaysCount: daysTo,
            MediaIds: [channelId],
          },
          PageSize: pageSize,
          PageNumber: pageNumber + 1,
        })
      );
    }
  }, [dispatch, channelId, pageNumber]);

  useEffect(() => {
    getFirstPage();
  }, [getFirstPage]);

  return {
    channel,
    isLoading,
    listLength,
    pageNumber,
    haveNextPage,
    getNextPage,
  };
};
