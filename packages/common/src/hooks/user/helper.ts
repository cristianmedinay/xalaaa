/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimeHelper } from "../../helpers";
import { assetTimestampToSeconds } from "../../hooks/player/helpers";
import { IAssetTimestampModel } from "../../models";

export const calculateTimestampProgress = (
  currentTimestamp: number,
  startDate: Date | string,
  endDate: Date | string
): number => {
  const startTimestamp = TimeHelper.getTimestamp(startDate);
  const endTimestamp = TimeHelper.getTimestamp(endDate);

  if (currentTimestamp >= startTimestamp && endTimestamp - startTimestamp > 0) {
    return Math.min(
      ((currentTimestamp - startTimestamp) / (endTimestamp - startTimestamp)) *
        100,
      100
    );
  }

  return 0;
};

export const calculateDurationProgress = (
  timestamp: IAssetTimestampModel,
  assetDurationInMs: number
): number => {
  return Math.min(
    (assetTimestampToSeconds(timestamp) * 100) / (assetDurationInMs / 1000),
    100
  );
};
