/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { VideoJsPlayer } from "video.js";

import { ROUTES } from "../../../constants";
import {
  MediaStreamType,
  MediaType,
  PlayerCustomVidneoEvents,
} from "../../../enums";
import { RouteHelper, TimeHelper } from "../../../helpers";
import { IAssetCategoryModel, IMediaModel } from "../../../models";
import { useAnalyticsContext } from "../AnalyticsContext";
import { getPlayerMetadata } from "../helpers/getPlayerMetadata";
import { usePlayerEventsParams } from "../types";

interface useKonodracPlayerParams {
  media: IMediaModel | undefined;
}

const heartBeatInterval = 50000;

export const useKonodracPlayer = (params: useKonodracPlayerParams) => {
  const { media } = params;

  const handlerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const firstPlayRef = useRef<boolean>(true);
  const loadedDataRef = useRef<boolean>(false);
  const isLoadedRef = useRef<boolean>(false);
  const isErrorRef = useRef<boolean>(false);
  const playerRef = useRef<VideoJsPlayer>();
  const playedSeconds = useRef<number>(0);
  const isWaiting = useRef<boolean>(false);
  const isPlaybackStarted = useRef<boolean>(false);
  const secsPlayedLastCalc = useRef<Date | null>(null);

  const currentProgram = media?.Media?.find((media) => {
    return TimeHelper.isCurrentBetween(media.StartDateTime, media.EndDateTime);
  });
  const [currentProgramId, setCurrentProgramId] = useState<string | undefined>(
    currentProgram?.Title
  );
  const isLiveProgress = useRef<boolean>(
    media?.MediaTypeCode === MediaType.Channel
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentProgram = media?.Media?.find((media) => {
        return TimeHelper.isCurrentBetween(
          media.StartDateTime,
          media.EndDateTime
        );
      });
      setCurrentProgramId(currentProgram?.Title);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [playerRef]);

  useEffect(() => {
    return () => {
      refreshProgramEvents();
    };
  }, [playerRef, currentProgramId]);

  const refreshProgramEvents = () => {
    playerRef.current && mediaFinish(getPlayerData(playerRef.current, "ended"));
    playedSeconds.current = 0;
    handlerRef.current && clearInterval(handlerRef.current);
    if (
      !isWaiting.current &&
      !playerRef.current?.paused() &&
      playerRef.current?.hasStarted()
    ) {
      playerRef.current && mediaPlay(getPlayerData(playerRef.current, "play"));
      handlerRef.current = setInterval(() => {
        playerRef.current &&
          mediaHeartbeat(getPlayerData(playerRef.current, "play"));
      }, heartBeatInterval);
    }
  };

  const {
    mediaStart,
    mediaPlay,
    mediaPause,
    mediaFinish,
    mediaSeek,
    mediaDispose,
    mediaHeartbeat,
    mediaError,
    mediaLoadedData,
    mediaFullScreen,
    mediaMute,
  } = useAnalyticsContext();

  // manually handle player dispose based on loading ref state
  useEffect(() => {
    return () => {
      if (isLoadedRef.current && playerRef.current) {
        mediaDispose(getPlayerData(playerRef.current, "dispose"));
        handlerRef.current && clearInterval(handlerRef.current);
      }
    };
  }, []);

  const getSecsPlayed = useCallback(() => {
    updateSecsPlayed();

    return Math.floor(playedSeconds.current);
  }, []);

  const updateSecsPlayed = useCallback(() => {
    let total = playedSeconds.current;
    const now = new Date();

    if (secsPlayedLastCalc.current !== null) {
      total += (now.getTime() - secsPlayedLastCalc.current.getTime()) / 1000;
    }

    if (
      !isWaiting.current &&
      !playerRef.current?.paused() &&
      playerRef.current?.hasStarted()
    ) {
      secsPlayedLastCalc.current = now;
    }

    playedSeconds.current = total;
  }, []);

  const pauseSecsPlayed = useCallback((updateNeeded = false) => {
    if (updateNeeded) {
      updateSecsPlayed();
    }

    secsPlayedLastCalc.current = null;
  }, []);

  const startSecsPlayed = useCallback(() => {
    secsPlayedLastCalc.current = new Date();
  }, []);

  const getStreamType = (streamType?: MediaStreamType): string => {
    if (streamType === MediaStreamType.Main) return "Principal";
    if (streamType === MediaStreamType.Trial) return "Tràiler";
    if (streamType === MediaStreamType.Promo) return "Promo";

    return "Principal";
  };

  const getPlayerData = (
    player: VideoJsPlayer,
    status: string
  ): usePlayerEventsParams => {
    const metaParams = media
      ? getPlayerMetadata(media, isLiveProgress.current)
      : null;

    const categories = media?.Categories;

    const topics: string[] =
      categories?.map(
        (category: IAssetCategoryModel) => category.CategoryCode as string
      ) || [];
    return {
      datasetid: metaParams?.datasetId as string,
      channel: metaParams?.channel,
      channelId: metaParams?.channelId,
      pageType: metaParams?.mediaType as string,
      cid:
        status === "ended" && media?.MediaTypeCode === MediaType.Channel
          ? metaParams?.previousCid || ""
          : (metaParams?.cid as string),
      programId:
        status === "ended" && media?.MediaTypeCode === MediaType.Channel
          ? metaParams?.previousProgramId || ""
          : (metaParams?.programId as string),
      playerStatus: status,
      secsPlayed: getSecsPlayed(),
      fullScreenStatus: player.isFullscreen(),
      muteStatus: player.muted(),
      mediaType: getStreamType(media?.MediaStreamType),
      mediaDuration: Math.floor(player.duration()),
      mediaName: media?.Title || "",
      mediaUrl: player.currentSrc(),
      mediaResolution: [player.videoWidth(), player.videoHeight()],
      currentPosition: Math.floor(player.currentTime()),
      bufferPercentage: Math.floor(player.bufferedPercent() * 100),
      playbackRate: player.playbackRate(),
      assetId: media?.Id as unknown as string,
      topics,
    };
  };

  const handleVidneoEvent = () => {
    playerRef.current && mediaFinish(getPlayerData(playerRef.current, "ended"));
    isLiveProgress.current = !isLiveProgress.current;
    playedSeconds.current = 0;
    handlerRef.current && clearInterval(handlerRef.current);
    if (
      !isWaiting.current &&
      !playerRef.current?.paused() &&
      playerRef.current?.hasStarted()
    ) {
      handlerRef.current = setInterval(() => {
        playerRef.current &&
          mediaHeartbeat(getPlayerData(playerRef.current, "play"));
      }, heartBeatInterval);
    }
  };

  const initEvents = useCallback((player: VideoJsPlayer, promo = false) => {
    playerRef.current = player;

    if (promo) {
      player.on("playing", () => {
        startSecsPlayed();
        isWaiting.current = false;

        console.log("playing", loadedDataRef.current, firstPlayRef.current);

        if (!isPlaybackStarted.current) {
          isPlaybackStarted.current = true;
        }

        if (firstPlayRef.current) {
          firstPlayRef.current = false;
          mediaStart(getPlayerData(player, "firstplay"));
        }
      });
    } else {
      player.on("playing", () => {
        startSecsPlayed();
        isWaiting.current = false;

        if (!isPlaybackStarted.current) {
          isPlaybackStarted.current = true;
        }

        if (loadedDataRef.current) {
          if (firstPlayRef.current) {
            firstPlayRef.current = false;
            mediaStart(getPlayerData(player, "firstplay"));
            handlerRef.current && clearInterval(handlerRef.current);
            handlerRef.current = setInterval(() => {
              mediaHeartbeat(getPlayerData(player, "play"));
            }, heartBeatInterval);
          } else {
            mediaPlay(getPlayerData(player, "play"));
          }
        }
      });

      player.on("loadedmetadata", () => {
        mediaLoadedData(getPlayerData(player, "loadedmetadata"));
        loadedDataRef.current = true;
      });
      player.on("pause", () => {
        if (!isWaiting.current) {
          mediaPause(getPlayerData(player, "pause"));
          pauseSecsPlayed();
        }
      });

      player.on("seeked", () => {
        // ignore seeked event until first play, since setting continue watching
        // will seek to given position and send additional marker
        if (isPlaybackStarted.current) {
          mediaSeek(getPlayerData(player, "seeked"));
        }
      });

      player.on("fullscreenchange", () => {
        mediaFullScreen(getPlayerData(player, "fullscreenchange"));
      });

      player.on("volumechange", () => {
        mediaMute(getPlayerData(player, "volumechange"));
      });
    }

    player.on("waiting", () => {
      isWaiting.current = true;
      pauseSecsPlayed(true);
    });

    player.on("loadstart", () => {
      isLoadedRef.current = true;
    });

    // dispose event may be called multiple times while content is reloaded in player
    player.on("dispose", () => {
      isLoadedRef.current = false;
    });

    player.on("ended", () => {
      mediaFinish(getPlayerData(player, "ended"));
      handlerRef.current && clearInterval(handlerRef.current);
      pauseSecsPlayed();
    });

    player.on("error", () => {
      if (!isErrorRef.current) {
        mediaError(getPlayerData(player, "error"));
        isErrorRef.current = true;
        handlerRef.current && clearInterval(handlerRef.current);
      }
    });

    player.on("vidneo.event", (_, data) => {
      if (data.event === PlayerCustomVidneoEvents.GoToChannel) {
        const newChannelId = data.customData.id;
        newChannelId &&
          RouteHelper.goTo(`${ROUTES.PLAYER_SCREEN}/${newChannelId}`);
      }

      const isRestartButtonClickedAndLiveProgres =
        data.event === PlayerCustomVidneoEvents.Restart &&
        isLiveProgress.current;

      const isToLiveButtonClickedAndNotLiveProgress =
        data.event === PlayerCustomVidneoEvents.ToLive &&
        !isLiveProgress.current;

      const isChannel = media?.MediaTypeCode === MediaType.Channel;

      if (
        isChannel &&
        (isRestartButtonClickedAndLiveProgres ||
          isToLiveButtonClickedAndNotLiveProgress)
      ) {
        handleVidneoEvent();
      }
    });
  }, []);

  return { initEvents };
};
