/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  ImageHelper,
  RouteHelper,
  ThemeContext,
  useAnalyticsContext,
} from "@xala/common";
import React, { useContext, useMemo, useRef } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

import { ImageWithPlaceholder } from "components/ImageWithPlaceholder";
import { WatchingProgressBar } from "components/WatchingProgressBar";
import { getTime } from "helpers/dateHelpers";
import { useElementSize, useHoverState, useStylesOnHover } from "hooks";
import resources from "resources/list";

import { IListComponentItemProps } from "../../models";

import "./ListComponentItemChannel.scss";

const itemMargin = 11.5;

export const ListComponentItemChannel = ({
  media,
  isPlaceholder = false,
  isActive,
}: IListComponentItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const contextType = useContext(ThemeContext);

  const themeProvider = contextType.themeProvider;

  const itemWidth = useElementSize(ref);

  const { isHover, onMouseEnter, onMouseLeave } = useHoverState();
  const { recoClick } = useAnalyticsContext();

  const stylesOnHover = useStylesOnHover(
    isActive,
    isHover,
    itemWidth,
    itemMargin
  );

  const showStartDateTime = useMemo(() => {
    if (
      media?.SimilarMedia &&
      media.SimilarMedia[0] &&
      media.SimilarMedia[0].StartDateTime &&
      media.SimilarMedia[0].EndDateTime
    ) {
      return `${getTime(
        new Date(media?.SimilarMedia[0].StartDateTime)
      )}h-${getTime(new Date(media?.SimilarMedia[0].EndDateTime))}h`;
    }

    return false;
  }, [media?.SimilarMedia]);

  const showTitle = useMemo(() => {
    if (
      media?.SimilarMedia &&
      media.SimilarMedia[0] &&
      media.SimilarMedia[0].Title
    ) {
      return media.SimilarMedia[0].Title;
    }

    return false;
  }, [media?.SimilarMedia]);

  const renderSkeleton = () => {
    const skeletonColor = themeProvider.getSkeletonColor();

    if (!media) {
      return (
        <div className="ListComponentItemChannel-container ListComponentItemChannel-container-skeleton">
          <SkeletonTheme color={skeletonColor} highlightColor={skeletonColor} />
        </div>
      );
    }

    return <></>;
  };

  if (!media || isPlaceholder) {
    return renderSkeleton();
  }

  const imageUrl = ImageHelper.getRoundImageUrl(media?.Images);
  const title = showTitle;
  const timeStamps = showStartDateTime;

  return (
    <div
      className="ListComponentItemChannel"
      style={{ ...stylesOnHover, margin: `0 ${itemMargin}px` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        RouteHelper.goToPlayer(media);
        recoClick(media);
      }}
      ref={ref}
    >
      <div className="ListComponentItemChannel-image-container">
        <ImageWithPlaceholder
          imageSrc={imageUrl}
          imageContainerClassName="ListComponentItemChannel-image"
          placeholderSrc={resources.coverPlaceholder}
          cellType={CellType.Channel}
          alt={media.Title}
        />
      </div>
      <div className="ListComponentItemChannel-information">
        {title && (
          <div className="ListComponentItemChannel-information--title">
            {title}
          </div>
        )}

        {timeStamps && (
          <div className="ListComponentItemChannel-information--duration">
            {timeStamps}
          </div>
        )}
      </div>
      <WatchingProgressBar media={media} />
    </div>
  );
};
