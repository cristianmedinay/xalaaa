/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import ReactPlayerLoader from "@brightcove/react-player-loader";
import {
  getCustomPlayerPoster,
  ImageHelper,
  IMediaModel,
  IMediaPlayInfoModel,
  MediaStreamType,
  useBrightcoveMediaLoader,
  useKonodracPlayer,
} from "@xala/common";
import React, { memo, RefObject } from "react";
import { VideoJsPlayer } from "video.js";

import resources from "resources/list";

import "./BrightcoveTeaserPlayer.scss";

type IBrightcovePlayerProps = {
  media: IMediaModel;
  mediaPlayInfo: IMediaPlayInfoModel;
  playerRef: React.MutableRefObject<VideoJsPlayer | undefined>;
  setIsTeaserEndedOrErrorEmited: (value: boolean) => void;
  muteButton?: RefObject<HTMLButtonElement>;
};

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const BrightcoveTeaserPlayerRaw = (props: IBrightcovePlayerProps) => {
  const {
    media,
    mediaPlayInfo,
    playerRef,
    setIsTeaserEndedOrErrorEmited,
    muteButton,
  } = props;

  const { videoId, source } = useBrightcoveMediaLoader({
    media,
    playInfo: mediaPlayInfo,
  });

  const { initEvents } = useKonodracPlayer({
    media: { ...media, MediaStreamType: MediaStreamType.Promo },
  });

  const accountId = process.env.REACT_APP_BRIGHTCOVE_ACCOUNT_ID;
  const playerId = process.env.REACT_APP_BRIGHTCOVE_PLAYER_ID;

  const highlightsImageUrl =
    ImageHelper.getHighlightsImageUrl(media?.Images) ||
    resources.highlightsPlaceholder;

  if (!media || !mediaPlayInfo || (!videoId && !source)) {
    return null;
  }

  return (
    <>
      <ReactPlayerLoader
        accountId={accountId}
        playerId={playerId}
        videoId={videoId}
        poster={getCustomPlayerPoster(media)}
        onSuccess={({ ref: player }) => {
          initEvents(player, true);
          // Safari workaround for missing poster in audio only content
          player.on("loadeddata", () => {
            const hasVideo = player.videoWidth() && player.videoHeight();

            player.poster(highlightsImageUrl);
            const plyerElement = player.contentEl() as HTMLElement;
            if (plyerElement) {
              plyerElement.style.backgroundImage = `url(${highlightsImageUrl})`;
              plyerElement.style.backgroundSize = "cover";
              plyerElement.style.backgroundPosition = "center";
            }

            if (isSafari && !hasVideo) {
              const posterContainer = player
                .contentEl()
                .querySelector("div.vjs-poster") as HTMLDivElement;

              posterContainer.style.display = "block";
            }
          });

          player.on("ended", () => {
            setIsTeaserEndedOrErrorEmited(true);
            if (muteButton?.current) {
              muteButton.current.setAttribute("style", "display: none");
            }
          });

          player.on("error", () => {
            setIsTeaserEndedOrErrorEmited(true);
            if (muteButton?.current) {
              muteButton.current.setAttribute("style", "display: none");
            }
          });

          muteButton?.current?.addEventListener("click", function () {
            const muted = player.muted();
            player.muted(!muted);
          });

          playerRef.current = player;
        }}
        onFailure={(error: unknown) => console.error(error)}
        options={{
          autoplay: true,
          fill: true,
          sources: source ? [{ ...source }] : [],
          muted: true,
          fluid: true,
        }}
      />
    </>
  );
};

export default memo(BrightcoveTeaserPlayerRaw);
