/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useCallback, useRef } from "react";
import { VideoJsPlayer } from "video.js";

import { IMediaModel, IMediaPlayInfoModel } from "models";

import { MediaType } from "../../../enums";
import { TimeHelper } from "../../../helpers";

interface useMediaLoaderParams {
  media: IMediaModel | undefined;
  playInfo: IMediaPlayInfoModel | undefined;
}

interface MediaSource {
  src: string;
  type?: string;
}

type useMediaLoaderValue = {
  videoId?: string;
  source?: MediaSource;
  onChannelProgramHandler: (
    player: VideoJsPlayer,
    startPosition: number,
    startPlayback?: boolean
  ) => void;
};

export const useBrightcoveMediaLoader = (
  params: useMediaLoaderParams
): useMediaLoaderValue => {
  const { media, playInfo } = params;

  const manifestPrepared = useRef<boolean>(false);

  const onChannelProgramHandler = useCallback(
    (player: VideoJsPlayer, startPosition: number, startPlayback?: boolean) => {
      player.on("loadstart", () => {
        const currentSrc = player.src();

        if (!media) {
          return;
        }

        const { MediaTypeCode, StartDateTime = "", EndDateTime = "" } = media;

        // for programs, add start and end query params to AWS manifest
        // url, required by time-shifted viewing reference in
        // AWS Elemental MediaPackage. This will work for past
        // programs, current program need to be played as live stream
        // without time-shift.
        if (!manifestPrepared.current && MediaTypeCode === MediaType.Program) {
          const startTimestamp = TimeHelper.getTimestamp(StartDateTime);
          const endTimestamp = TimeHelper.getTimestamp(EndDateTime);

          const separator = currentSrc.includes("?") ? "&" : "?";

          player.pause();
          player.src(
            `${currentSrc}${separator}start=${startTimestamp}&end=${endTimestamp}`
          );

          manifestPrepared.current = true;
        }

        if (startPosition) {
          player.currentTime(startPosition);
        }

        // force playback
        startPlayback && player.play();
      });
    },
    [media]
  );

  if (!playInfo || !playInfo.ContentUrl || !media?.MediaTypeCode) {
    return { onChannelProgramHandler };
  }

  const { UrlSource = "Internal", ContentUrl, ContentType } = playInfo;

  switch (UrlSource) {
    case "Konodrac":
    case "Brightcove": {
      return {
        onChannelProgramHandler,

        // backend returns external id as url when provider is not internal
        videoId: ContentUrl,
      };
    }
    case "Internal":
      return {
        onChannelProgramHandler,
        source: {
          src: ContentUrl,
          type: ContentType,
        },
      };
  }
};
