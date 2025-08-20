/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaType } from "../../../enums";
import { TimeHelper } from "../../../helpers";
import { IMediaModel } from "../../../models";

const DEFAULT_DATASET_ID =
  import.meta.env.VITE_KONODRAC_ANALYTICS_DATASETID || "";
const DEFAULT_CHANNEL_NAME =
  import.meta.env.VITE_KONODRAC_DEFAULT_CHANNEL_NAME || "";
const DEFAULT_CHANNEL_ID =
  import.meta.env.VITE_KONODRAC_DEFAULT_CHANNELID || "";

type PlayerMediaMetadata = {
  datasetId: string;
  channel: string;
  channelId: string;
  programId: string;
  cid: string;
  mediaType: MediaType;
  previousProgramId?: string;
  previousCid?: string;
};

export const getPlayerMetadata = (
  media: IMediaModel,
  isLiveProgress?: boolean
): PlayerMediaMetadata => {
  const getLiveDataHelper = (currentMedia: IMediaModel) => {
    let previouseProgramIndex = 0;
    const currentProgram = currentMedia?.Media?.find((mediaItem, i) => {
      if (
        TimeHelper.isCurrentBetween(
          mediaItem.StartDateTime,
          mediaItem.EndDateTime
        )
      ) {
        previouseProgramIndex = i > 0 ? i - 1 : i;
        return mediaItem;
      }
    });
    const startDateTime = currentProgram?.StartDateTime || "";
    const startDate = TimeHelper.format(startDateTime, "_DD-MM-YYYY_HH");

    const previousProgramId =
      currentMedia?.Media?.[previouseProgramIndex]?.Title;
    const previousCid = previousProgramId
      ? previousProgramId + startDate
      : undefined;

    return { currentProgram, startDate, previousCid, previousProgramId };
  };

  switch (media.MediaTypeCode) {
    case MediaType.Channel: {
      const { currentProgram, startDate, previousCid, previousProgramId } =
        getLiveDataHelper(media);

      return {
        datasetId: media?.BCID || "",
        channel: media?.Title || "",
        channelId: media?.ExternalId || "",
        mediaType: isLiveProgress ? MediaType.Live : MediaType.Catchup,
        programId: currentProgram?.Title || "",
        cid: currentProgram?.Title + startDate,
        previousProgramId: previousProgramId,
        previousCid: previousCid,
      };
    }
    case MediaType.Program: {
      const startDateTime = media?.StartDateTime || "";
      let startDate = TimeHelper.format(startDateTime, "_DD-MM-YYYY_HH");

      if (!media?.StartDateTime) {
        const { startDate: liveStartDate } = getLiveDataHelper(media);
        startDate = liveStartDate;
      }

      return {
        datasetId: media?.ParentMediaBCID || "",
        channel: media?.ParentMediaTitle || "",
        channelId: media?.ParentMediaExternalId || "",
        mediaType: MediaType.Catchup,
        programId: media?.Title || "",
        cid: media?.Title + startDate,
      };
    }
    case MediaType.Podcast: {
      const startDateTime = media?.StartDateTime || "";
      const startDate = TimeHelper.format(startDateTime, "_DD-MM-YYYY_HH");

      return {
        datasetId: media?.EntityBCID || DEFAULT_DATASET_ID,
        channel: media?.EntityName || DEFAULT_CHANNEL_NAME,
        channelId: DEFAULT_CHANNEL_ID,
        mediaType: MediaType.Podcast,
        programId: media?.Title || "",
        cid: media?.Title + startDate,
      };
    }

    case MediaType.Live: {
      const startDateTime = media?.StartDateTime || "";
      const startDate = TimeHelper.format(startDateTime, "_DD-MM-YYYY_HH");

      return {
        datasetId: media?.EntityBCID || DEFAULT_DATASET_ID,
        channel: media?.EntityName || DEFAULT_CHANNEL_NAME,
        channelId: DEFAULT_CHANNEL_ID,
        mediaType: MediaType.Live,
        programId: media?.Title || "",
        cid: media?.Title + startDate,
      };
    }

    case MediaType.Event: {
      const startDateTime = media?.StartDateTime || "";
      const startDate = TimeHelper.format(startDateTime, "_DD-MM-YYYY_HH");

      return {
        datasetId: media?.EntityBCID || DEFAULT_DATASET_ID,
        channel: media?.EntityName || DEFAULT_CHANNEL_NAME,
        channelId: DEFAULT_CHANNEL_ID,
        mediaType: MediaType.Live,
        programId: media?.Title || "",
        cid: media?.Title + startDate,
      };
    }

    default: {
      return {
        datasetId: media?.EntityBCID || DEFAULT_DATASET_ID,
        channel: media?.EntityName || DEFAULT_CHANNEL_NAME,
        channelId: DEFAULT_CHANNEL_ID,
        mediaType: MediaType.Video,
        programId: media?.Title || "",
        cid: media?.Title || "",
      };
    }
  }
};
