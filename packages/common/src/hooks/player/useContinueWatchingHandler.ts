/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useCallback, useRef } from "react";
import { VideoJsPlayer } from "video.js";

import { MediaStreamType, MediaType } from "../../enums";
import { DataProvider } from "../../providers";

import {
  CONTINUE_WATCHING_IGNORE_BEFORE_SECONDS,
  CONTINUE_WATCHING_PLAYBACK_UPDATE_SECONDS,
} from "./const";
import { isContinueWatchingAvailable } from "./helpers";

interface useContinueWatchingHandlerParams {
  mediaId: number;
  mediaType: MediaType;
  streamType: MediaStreamType;
}

export const useContinueWatchingHandler = (
  params: useContinueWatchingHandlerParams
) => {
  const { mediaId, mediaType, streamType } = params;

  const lastTimeRef = useRef<number>(0);

  const isContinuousWatchingEnabled = isContinueWatchingAvailable(
    mediaType,
    streamType
  );

  const sendMarker = useCallback(
    (timeInSeconds: number) => {
      if (lastTimeRef.current !== timeInSeconds) {
        lastTimeRef.current = timeInSeconds;
        DataProvider.setWatchProgress(mediaId, timeInSeconds);
      }
    },
    [mediaId]
  );

  const onContinueWatchingHandler = useCallback(
    (player: VideoJsPlayer) => {
      if (!isContinuousWatchingEnabled) {
        return;
      }

      player.on("timeupdate", () => {
        const currentPlayerTime = Math.floor(player.currentTime());
        const shouldSendMarker =
          currentPlayerTime % CONTINUE_WATCHING_PLAYBACK_UPDATE_SECONDS === 0 &&
          currentPlayerTime >= CONTINUE_WATCHING_IGNORE_BEFORE_SECONDS;

        if (shouldSendMarker) {
          sendMarker(currentPlayerTime);
        }
      });

      player.on("pause", () => {
        const currentPlayerTime = Math.floor(player.currentTime());
        const shouldSendMarker =
          currentPlayerTime >= CONTINUE_WATCHING_IGNORE_BEFORE_SECONDS;

        if (shouldSendMarker) {
          sendMarker(currentPlayerTime);
        }
      });

      player.on("ended", () => {
        const currentPlayerTime = Math.floor(player.currentTime());

        sendMarker(currentPlayerTime);
      });
    },
    [isContinuousWatchingEnabled, mediaId, streamType]
  );

  return {
    onContinueWatchingHandler,
  };
};
