/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import loadable from "@loadable/component";
import { IMediaModel, IMediaPlayInfoModel } from "@xala/common";
import React, { RefObject, useRef } from "react";
import { VideoJsPlayer } from "video.js";

import "./TeaserPlayer.scss";

const BrightcoveTeaserPlayer = loadable(
  () => import("../BrightcoveTeaserPlayer/BrightcoveTeaserPlayer")
);

export interface VideoPlayerProps {
  media: IMediaModel;
  mediaPlayInfo: IMediaPlayInfoModel;
  setIsTeaserEndedOrErrorEmited: (value: boolean) => void;
  muteButton?: RefObject<HTMLButtonElement>;
}

export const TeaserPlayer = (props: VideoPlayerProps) => {
  const { media, mediaPlayInfo, setIsTeaserEndedOrErrorEmited, muteButton } =
    props;

  const player = useRef<VideoJsPlayer | undefined>();

  return (
    <div className="VideoPlayer">
      <BrightcoveTeaserPlayer
        playerRef={player}
        media={media}
        mediaPlayInfo={mediaPlayInfo}
        setIsTeaserEndedOrErrorEmited={setIsTeaserEndedOrErrorEmited}
        muteButton={muteButton}
      />
    </div>
  );
};
