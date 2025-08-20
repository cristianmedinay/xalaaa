/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import loadable from "@loadable/component";
import {
  IMediaModel,
  IMediaPlayInfoModel,
  MediaStreamType,
} from "@xala/common";
import React, { useRef, useState } from "react";
import { VideoJsPlayer } from "video.js";

import { AssetInfoOverlay } from "./AssetInfoOverlay";
import "./VideoPlayer.scss";

const BrightcovePlayer = loadable(
  () => import("../BrightcovePlayer/BrightcovePlayer")
);

export interface VideoPlayerProps {
  autoplay?: boolean;
  media: IMediaModel;
  mediaPlayInfo: IMediaPlayInfoModel;
  streamType: MediaStreamType;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
  const { autoplay = false, media, mediaPlayInfo, streamType } = props;
  const [isAssetInfoVisible, setIsAssetInfoVisible] = useState(!autoplay);

  const player = useRef<VideoJsPlayer | undefined>();

  const onClickOverlay = () => {
    setIsAssetInfoVisible(false);
    player.current?.play();
  };

  return (
    <div className="VideoPlayer">
      <BrightcovePlayer
        playerRef={player}
        media={media}
        mediaPlayInfo={mediaPlayInfo}
        streamType={streamType}
        autoplay={autoplay}
      >
        <AssetInfoOverlay
          media={media}
          isVisible={isAssetInfoVisible}
          onClick={onClickOverlay}
        />
      </BrightcovePlayer>
    </div>
  );
};
