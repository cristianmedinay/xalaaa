/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IMediaModel,
  TimeHelper,
  useAssetContinueWatchingProgress,
} from "@xala/common";
import React, { memo } from "react";

import "./WatchingProgressBar.scss";
interface WatchingProgressBarProps {
  media: IMediaModel | undefined;
  borderRadius?: number;
  height?: number;
}

const WatchingProgressBarRaw = (props: WatchingProgressBarProps) => {
  const { media, height = 4, borderRadius = 10 } = props;

  const { watchingProgress } = useAssetContinueWatchingProgress(media);

  if (TimeHelper.isBeforeCurrent(media?.EndDateTime)) {
    return null;
  }

  const showWatchingProgress = Boolean(watchingProgress);

  return showWatchingProgress ? (
    <div
      className="WatchingProgressBar"
      style={{
        height: `${height}px`,
        borderBottomLeftRadius: `${borderRadius}px`,
        borderBottomRightRadius: `${borderRadius}px`,
      }}
    >
      <div
        className="WatchingProgressBar-value"
        style={{
          width: `${watchingProgress}%`,
          height: `${height}px`,
          borderRadius: `${borderRadius}px`,
        }}
      />
    </div>
  ) : null;
};
export const WatchingProgressBar = memo(WatchingProgressBarRaw);

WatchingProgressBar.displayName = "WatchingProgressBar";
