/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import ReactPlayerLoader from "@brightcove/react-player-loader";
import {
  getCustomPlayerPoster,
  IMediaModel,
  IMediaPlayInfoModel,
  MediaStreamType,
  MediaType,
  useBrightcoveMediaLoader,
  useContinueWatchingHandler,
  useContinueWatchingResume,
  useKonodracPlayer,
} from "@xala/common";
import React, { memo } from "react";
import { VideoJsPlayer } from "video.js";

import "./BrightcovePlayer.scss";

type IBrightcovePlayerProps = {
  media: IMediaModel;
  mediaPlayInfo: IMediaPlayInfoModel;
  streamType: MediaStreamType;
  playerRef: React.MutableRefObject<VideoJsPlayer | undefined>;
  children: React.ReactNode;
  autoplay?: boolean;
};

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const BrightcovePlayerRaw = (props: IBrightcovePlayerProps) => {
  const {
    media,
    mediaPlayInfo,
    streamType,
    children,
    playerRef,
    autoplay = false,
  } = props;

  const mediaType = media.MediaTypeCode as MediaType;

  const { videoId, source, onChannelProgramHandler } = useBrightcoveMediaLoader(
    {
      media,
      playInfo: mediaPlayInfo,
    }
  );

  const accountId = import.meta.env.VITE_BRIGHTCOVE_ACCOUNT_ID;
  const playerId = import.meta.env.VITE_BRIGHTCOVE_PLAYER_ID;

  const { onContinueWatchingHandler } = useContinueWatchingHandler({
    mediaId: media.Id,
    mediaType,
    streamType,
  });

  const { startPosition, loaded: startPositionLoaded } =
    useContinueWatchingResume({
      streamType,
      mediaPlayInfo,
    });

  const { initEvents } = useKonodracPlayer({
    media: { ...media, MediaStreamType: streamType },
  });

  if (
    !media ||
    !mediaPlayInfo ||
    (!videoId && !source) ||
    !startPositionLoaded
  ) {
    return null;
  }

  console.log("@PLAYER loading media", {
    accountId,
    playerId,
    videoId,
    source,
    media,
  });

  return (
    <>
      <ReactPlayerLoader
        accountId={accountId}
        playerId={playerId}
        videoId={videoId}
        poster={getCustomPlayerPoster(media)}
        onSuccess={({ ref: player }) => {
          onChannelProgramHandler(player, startPosition, autoplay);
          onContinueWatchingHandler(player);

          initEvents(player);

          // Safari workaround for missing poster in audio only content
          player.on("loadeddata", () => {
            const hasVideo = player.videoWidth() && player.videoHeight();

            if (isSafari && !hasVideo) {
              const posterContainer = player
                .contentEl()
                .querySelector("div.vjs-poster") as HTMLDivElement;

              posterContainer.style.display = "block";
            }
          });

          playerRef.current = player;
        }}
        onFailure={(error: unknown) => console.error(error)}
        options={{
          autoplay: false,
          preload: "metadata",
          fill: true,
          controls: true,
          sources: source ? [{ ...source }] : [],
        }}
      />
      {children}
    </>
  );
};

export default memo(BrightcovePlayerRaw);
