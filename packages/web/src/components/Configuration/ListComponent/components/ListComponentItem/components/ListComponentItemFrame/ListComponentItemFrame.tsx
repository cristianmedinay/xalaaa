/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  CellType,
  ImageHelper,
  MediaType,
  RouteHelper,
  ThemeContext,
  TimeHelper,
  useAnalyticsContext,
} from "@xala/common";
import cx from "classnames";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

import { Label } from "components";
import { ImageWithPlaceholder } from "components/ImageWithPlaceholder";
import { WatchingProgressBar } from "components/WatchingProgressBar";
import { useElementSize, useHoverState, useStylesOnHover } from "hooks";
import resources from "resources/list";

import { IListComponentItemProps } from "../../models";

import { AdditionalDetails } from "./AdditionalDetails/AdditionalDetails";
import "./ListComponentItemFrame.scss";
import { removeParentTitle } from "helpers/textHelper";

const itemMargin = 12.5;

export const ListComponentItemFrame = ({
  media,
  isActive,
  cellType,
  hideDate = false,
  showTimeLeft = false,
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

  const title = useMemo(() => {
    return removeParentTitle(media?.Title);
  }, [media?.Title]);

  const showStartDateTime = useCallback(() => {
    if (
      media?.StartDateTime &&
      media.EndDateTime &&
      TimeHelper.isCurrentBetween(media.StartDateTime, media.EndDateTime)
    ) {
      return (
        <>
          <div>{TimeHelper.format(media.StartDateTime, "DD-MM-YYYY")}</div>
          <div style={{ lineHeight: 1.3 }}>
            {TimeHelper.format(media.StartDateTime, "HH:mm")}h -
            {TimeHelper.format(media.EndDateTime, "HH:mm")}h
          </div>
        </>
      );
    }

    if (
      media?.StartDateTime &&
      media.EndDateTime &&
      !TimeHelper.isCurrentBetween(media.StartDateTime, media.EndDateTime)
    ) {
      return (
        <>
          <div>{TimeHelper.format(media.StartDateTime, "DD-MM-YYYY")}</div>
          <div style={{ lineHeight: 1.3 }}>
            {TimeHelper.format(media.StartDateTime, "HH:mm")}h -
            {TimeHelper.format(media.EndDateTime, "HH:mm")}h
          </div>
        </>
      );
    }

    return "";
  }, [media]);

  const duration =
    media?.MediaTypeCode === MediaType.Live && showStartDateTime();

  const customFrameDetails = useMemo(() => {
    if (cellType === CellType.Custom && media) {
      return (
        <AdditionalDetails
          data={media}
          hideDate={!media?.AssetDatesVisible || hideDate}
        />
      );
    }

    return null;
  }, [cellType, isActive, isHover, itemWidth, media, stylesOnHover, hideDate]);

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

  const frameImageUrl = ImageHelper.getFrameImageUrl(media?.Images);

  return (
    <>
      <div
        className="ListComponentItemFrame"
        onClick={() => {
          recoClick(media);
          RouteHelper.handleClickFromListComponentItem(media);
        }}
        style={{ ...stylesOnHover, margin: `0 ${itemMargin}px` }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={ref}
      >
        <div>
          <Label media={media} showTime={showTimeLeft} />
          <div className="ListComponentItemFrame-image-container">
            <ImageWithPlaceholder
              imageSrc={frameImageUrl}
              imageContainerClassName="ListComponentItemFrame-image"
              placeholderSrc={resources.framePlaceholder}
              cellType={cellType}
              alt={media.Title}
            />
            <div
              className={cx("ListComponentItemFrame-information", {
                "ListComponentItemFrame-information--series":
                  cellType === CellType.Custom,
              })}
            >
              <div className="ListComponentItemFrame-information--title">
                {title}
              </div>
              {duration && (
                <div className="ListComponentItemFrame-information--duration">
                  {duration}
                </div>
              )}
              {(media.MediaTypeCode === "PODCAST" ||
                media.MediaTypeCode === "EPISODE") &&
                media?.AbsoluteParentMediaTitle && (
                  <div className="ListComponentItemFrame-information--parentMedia">
                    {media.AbsoluteParentMediaTitle}
                  </div>
                )}
              {media.MediaTypeCode === "EVENT" && media.Label && (
                <div className="ListComponentItemFrame-information--label">
                  {media.Label}
                </div>
              )}
            </div>
          </div>
        </div>
        {customFrameDetails}
        <WatchingProgressBar media={media} />
      </div>
    </>
  );
};
