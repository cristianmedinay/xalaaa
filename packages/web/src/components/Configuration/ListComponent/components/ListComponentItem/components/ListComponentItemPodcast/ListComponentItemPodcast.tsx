/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  MediaType,
  RouteHelper,
  TimeHelper,
  useAnalyticsContext,
  useIsPlayerAvailable,
  useTheme,
} from "@xala/common";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SkeletonTheme } from "react-loading-skeleton";

import { Label } from "components";
import PlayIcon from "resources/icons/play.svg";

import { IListComponentItemProps } from "../../models";

import "./ListComponentItemPodcast.scss";

import { removeParentTitle } from "helpers/textHelper";

export const ListComponentItemPodcast = ({
  media,
}: IListComponentItemProps) => {
  const themeProvider = useTheme();

  const { recoClick } = useAnalyticsContext();

  const { isStreamable, isSourceAvailable, isAvailable } =
    useIsPlayerAvailable(media);

  const isContentAvailableToPlay =
    isStreamable && isSourceAvailable && isAvailable;

  const getDuration = useMemo(() => {
    return TimeHelper.formatFromTo(media?.Duration);
  }, [media]);

  const { i18n } = useTranslation();

  const title = useMemo(() => {
    return removeParentTitle(media?.Title);
  }, [media?.Title]);

  const getDate = useMemo(() => {
    return TimeHelper.getTranslatedStartDate(
      media?.AvailableFrom,
      i18n.language,
      "D MMM YYYY"
    );
  }, [i18n.language, media?.AvailableFrom]);

  const renderSkeleton = () => {
    const skeletonColor = themeProvider.getSkeletonColor();
    return (
      <div className="ListComponentItemFrame-container ListComponentItemFrame-container--skeleton">
        <SkeletonTheme color={skeletonColor} highlightColor={skeletonColor}>
          <div className="ListComponentItemFrame-skeleton" />
        </SkeletonTheme>
      </div>
    );
  };
  if (!media) {
    return renderSkeleton();
  }

  const routeHandlerToDetails = () => {
    recoClick(media);

    return RouteHelper.goToDetails(media);
  };

  const routeHandlerToPlayer = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (media.MediaTypeCode === MediaType.Podcast && isContentAvailableToPlay) {
      recoClick(media);

      return RouteHelper.goToPlayer(media);
    }
  };

  return (
    <>
      <div className="ListComponentPodcastItem" onClick={routeHandlerToDetails}>
        <Label media={media} />
        <div>
          <div className="ListComponentPodcastItem-info-date">{getDate}</div>
          <div className="ListComponentPodcastItem-info-title">{title}</div>
          <div
            className="ListComponentPodcastItem-info-description"
            dangerouslySetInnerHTML={{
              __html: media.ShortDescription || "",
            }}
          ></div>

          {isContentAvailableToPlay && (
            <div className="ListComponentPodcastItem-info-buttonSection">
              <div
                className="ListComponentPodcastItem-info-buttonSection-icon"
                onClick={routeHandlerToPlayer}
              >
                <PlayIcon />
              </div>
              <div className="ListComponentPodcastItem-info-buttonSection-duration">
                {getDuration}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
