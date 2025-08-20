/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaImageType, MediaStreamType, MediaType } from "../../enums";
import { ImageHelper } from "../../helpers";
import { IAssetTimestampModel, IMediaModel } from "../../models";

import { CONTINUE_WATCHING_SUPPORTED_MEDIA } from "./const";

export const isContinueWatchingAvailable = (
  mediaType: MediaType,
  streamType: MediaStreamType
): boolean => {
  const isTrialStream = streamType === MediaStreamType.Trial;

  const isSupportedMediaType =
    CONTINUE_WATCHING_SUPPORTED_MEDIA.includes(mediaType);

  return isSupportedMediaType && !isTrialStream;
};

export const assetTimestampToSeconds = (
  timestamp: IAssetTimestampModel
): number => {
  const { Hour, Minute, Second } = timestamp;

  return (Hour ?? 0) * 3600 + (Minute ?? 0) * 60 + (Second ?? 0);
};

export const getCustomPlayerPoster = (
  media: IMediaModel
): string | undefined => {
  if (media.MediaTypeCode) {
    const shouldUseCustomPoster = [MediaType.Podcast, MediaType.Album].includes(
      media.MediaTypeCode
    );

    if (shouldUseCustomPoster) {
      return ImageHelper.getImageByType(
        media.Images,
        media.MediaTypeCode === MediaType.Podcast
          ? MediaImageType.Frame
          : MediaImageType.Highlights
      )?.Url;
    }
  }
};
