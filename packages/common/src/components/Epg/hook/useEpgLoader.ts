/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { MediaDayTimeFilter, MediaListType } from "../../../enums";
import { TimeHelper } from "../../../helpers";
import { IMediaListStateModel, IMediaModel } from "../../../models";
import { IAppState, MediaStore } from "../../../store";
import { EpgChannel, EpgProgram } from "../types";

import { EpgLoaderValue } from "./types";

interface useEpgLoaderProps {
  mediaListId?: number;
}

interface EpgData {
  channels: EpgChannel[];
  programs: EpgProgram[];
  isLoading: boolean;
}

const initialState: EpgData = {
  channels: [],
  programs: [],
  isLoading: false,
};

const loadingState: EpgData = {
  channels: [],
  programs: [],
  isLoading: true,
};

export const useEpgLoader = (props: useEpgLoaderProps): EpgLoaderValue => {
  const { mediaListId } = props;

  const [data, setData] = useState<EpgData>({ ...initialState });

  // store loading day to extract data from selector
  const loadingDayRef = useRef<Date>();

  const dispatch = useDispatch();

  const epgLists = useSelector<IAppState, IMediaListStateModel>(
    (state) => state.media.epg,
    shallowEqual
  );

  const prepareProgram = (
    media: IMediaModel,
    channelId: number
  ): EpgProgram => {
    const { Id, Title, EndDateTime, StartDateTime } = media;

    return {
      id: Id,
      title: Title as string,
      channelId,
      since: StartDateTime || "",
      till: EndDateTime || "",
    };
  };

  const prepareChannel = (media: IMediaModel, index: number): EpgChannel => {
    const { Id, Title, Images } = media;

    return {
      index,
      logo: Images?.[0]?.Url,
      title: Title as string,
      id: Id,
    };
  };

  // map media list data to EPG input format
  useEffect(() => {
    if (loadingDayRef.current) {
      const day = TimeHelper.format(loadingDayRef.current, "YYYY-MM-DD");

      // get channels only with Media (we don't show channels without programs for given day)
      const rawChannels =
        epgLists[day]?.Entities?.filter((entry) => entry.Media) || [];

      const channelsData = rawChannels.map((entry, index) =>
        prepareChannel(entry, index)
      );

      const dayDate = TimeHelper.getStartOfDay(day);

      // channels are filtered to have Media, so cast to EpgProgram[] is safe here
      const programsData = rawChannels.flatMap(
        (channel) =>
          channel.Media?.filter((program) => {
            return (
              new Date(program?.EndDateTime || 0).getTime() > dayDate.getTime()
            );
          }).map((program) =>
            prepareProgram(program, channel.Id)
          ) as EpgProgram[]
      );

      setData({
        channels: channelsData,
        programs: programsData,
        isLoading: Boolean(epgLists[day].IsLoading),
      });
    }
  }, [epgLists]);

  const load = useCallback(
    async (day: Date) => {
      setData({ ...loadingState });

      // store day in ref, to access correct media list from redux selector
      loadingDayRef.current = day;

      const dayFrom = TimeHelper.format(
        TimeHelper.getStartOfDay(day),
        "YYYY-MM-DDTHH:mm:ssZ"
      );

      if (mediaListId) {
        dispatch(
          MediaStore.Actions.getMediaListForEpg({
            MediaListId: mediaListId,
            Type: MediaListType.Epg,
            IncludeCategories: false,
            IncludeImages: true,
            IncludeMedia: true,
            PageNumber: 1,
            PageSize: 100,
            MediaOptions: {
              DateFrom: dayFrom,
              DayTime: MediaDayTimeFilter.AllDay,
            },
          })
        );
      }
    },
    [dispatch, mediaListId]
  );

  return {
    ...data,
    load,
  };
};
