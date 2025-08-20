/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useMemo } from "react";

import { MediaType } from "../../enums";
import { TimeHelper } from "../../helpers";
import { IMediaModel } from "../../models";

import {
  calculateDurationProgress,
  calculateTimestampProgress,
} from "./helper";
import { useUserAssetProperties } from "./useUserAssetProperties";

export const useAssetContinueWatchingProgress = (
  media: IMediaModel | undefined
) => {
  const { Id: assetId, Duration: durationMs, MediaTypeCode } = media || {};

  const { assetProperties } = useUserAssetProperties(assetId);

  const watchingProgress = useMemo(() => {
    const currentTimestamp = TimeHelper.getTimestamp(
      TimeHelper.getCurrentDateTime()
    );

    switch (MediaTypeCode) {
      // Channel have current playing program in SimilarMedia as first element
      case MediaType.Channel:
        const {
          StartDateTime: currentProgramStartDate,
          EndDateTime: currentProgramEndDate,
        } = media?.SimilarMedia?.[0] || {};

        return currentProgramStartDate && currentProgramEndDate
          ? calculateTimestampProgress(
              currentTimestamp,
              currentProgramStartDate,
              currentProgramEndDate
            )
          : 0;
      // Program have direct start and end date
      case MediaType.Program:
      case MediaType.Live:
        const { StartDateTime, EndDateTime } = media || {};

        return StartDateTime && EndDateTime
          ? calculateTimestampProgress(
              currentTimestamp,
              StartDateTime,
              EndDateTime
            )
          : 0;
      // Other content uses duration instead of start and end date
      default:
        if (durationMs && assetProperties?.Timestamp) {
          return calculateDurationProgress(
            assetProperties.Timestamp,
            durationMs
          );
        }
    }

    return 0;
  }, [assetProperties]);

  return {
    watchingProgress,
  };
};
