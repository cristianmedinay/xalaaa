/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  MediaStreamType,
  RouteHelper,
  useGetMedia,
  useGetMediaPlayInfo,
  useIdRouteParam,
  useIsLoggedIn,
  useRouteQueryParams,
  useStoreCurrentPlayerMetadata,
} from "@xala/common";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { VideoPlayer } from "components/VideoPlayer";

import "./Watch.scss";

export const Watch = () => {
  const { t } = useTranslation();
  const isUserLoggedIn = useIsLoggedIn();
  const mediaId = useIdRouteParam();

  const { streamType = MediaStreamType.Main } = useRouteQueryParams<{
    streamType: MediaStreamType;
  }>();

  const {
    media,
    isError: isMediaError,
    isLoading: isLoadingMedia,
  } = useGetMedia({ mediaId });

  useEffect(() => {
    if (
      isLoadingMedia === false &&
      !media?.AllowUnregistered &&
      !isUserLoggedIn &&
      streamType !== MediaStreamType.Trial
    ) {
      return RouteHelper.goToLogin(true);
    }
  }, [isUserLoggedIn, streamType, media, isLoadingMedia]);

  useStoreCurrentPlayerMetadata(media);

  const {
    playInfo,
    isError: isPlayInfoError,
    isLoading: isLoadingPlayInfo,
  } = useGetMediaPlayInfo({ mediaId, streamType });

  const isLoading = isLoadingMedia || isLoadingPlayInfo;
  const isLoadingError = isMediaError || isPlayInfoError;
  const isNoContent = !isLoading && (!playInfo || !playInfo.ContentUrl);

  if (isLoading) return <></>;

  if (isNoContent || isLoadingError) {
    return (
      <div className="watch">
        <p className="watch__error_message">
          {t("WATCH__NO_RESOURCE", "No resource to load!")}
        </p>
      </div>
    );
  }

  if (media && playInfo) {
    return (
      <VideoPlayer
        media={media}
        mediaPlayInfo={playInfo}
        streamType={streamType}
        autoplay
      />
    );
  }

  return <></>;
};
