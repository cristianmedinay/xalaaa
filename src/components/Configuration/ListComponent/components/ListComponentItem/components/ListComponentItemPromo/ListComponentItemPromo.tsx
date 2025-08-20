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
  TimeHelper,
  useAnalyticsContext,
} from "@xala/common";
import React, { useContext, useMemo, useRef } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { ImageWithPlaceholder } from "components/ImageWithPlaceholder";
import { useElementSize, useHoverState, useStylesOnHover } from "hooks";
import resources from "resources/list";

import { IListComponentItemProps } from "../../models";

import "./ListComponentItemPromo.scss";

import { Label } from "components";

const itemMargin = 15;

export const ListComponentItemPromo = ({
  media,
  isPlaceholder = false,
  isActive,
}: IListComponentItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const contextType = useContext(ThemeContext);
  const themeProvider = contextType.themeProvider;

  const itemWidth = useElementSize(ref);

  const marginOffSet = 0.0426;
  const fontSizeDescriptionPercentage = 0.034;
  const fontSizeTitlePercentage = 0.057;

  const { isHover, onMouseEnter, onMouseLeave } = useHoverState();
  const { recoClick } = useAnalyticsContext();

  const stylesOnHover = useStylesOnHover(
    isActive,
    isHover,
    itemWidth,
    itemMargin
  );

  const resizedTitleFontSize: React.CSSProperties = useMemo(() => {
    return {
      fontSize: itemWidth * fontSizeTitlePercentage,
      marginBottom: itemWidth * marginOffSet,
    };
  }, [itemWidth, isActive, isHover]);

  const resizedInformationFontSize: React.CSSProperties = useMemo(() => {
    return {
      fontSize: itemWidth * fontSizeDescriptionPercentage,
      marginBottom: itemWidth * marginOffSet,
    };
  }, [itemWidth, isActive, isHover]);

  const renderSkeleton = () => {
    const skeletonColor = themeProvider.getSkeletonColor();
    if (!media) {
      return (
        <div className="ListComponentItemPromo-container ListComponentItemPromo-container--skeleton">
          <SkeletonTheme color={skeletonColor} highlightColor={skeletonColor}>
            <div className="ListComponentItemPromo-skeleton">
              <div>
                <Skeleton width={"20%"} height="10px" />
              </div>
              <div>
                <Skeleton width={"40%"} height="17px" />
              </div>
            </div>
          </SkeletonTheme>
        </div>
      );
    }
    return <></>;
  };
  if (!media || isPlaceholder) {
    return renderSkeleton();
  }
  const promoImageUrl = ImageHelper.getCoverImageUrl(media?.Images);
  const title = media?.Title;
  const description = media?.ShortDescription;
  const duration = TimeHelper.formatDuration(media?.Duration);

  return (
    <div
      className="ListComponentItemPromo"
      style={{ ...stylesOnHover, margin: `0 ${itemMargin}px` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        recoClick(media);
        RouteHelper.handleClickFromListComponentItem(media);
      }}
      ref={ref}
    >
      <Label media={media} />
      <div className="ListComponentItemPromo-image-container">
        <ImageWithPlaceholder
          imageSrc={promoImageUrl}
          imageContainerClassName="ListComponentItemPromo-image"
          placeholderSrc={resources.coverPlaceholder}
          cellType={CellType.Promo}
          alt={media.Title}
        />
      </div>
      <div className="ListComponentItemPromo-information">
        <div
          style={resizedTitleFontSize}
          className="ListComponentItemPromo-information--title"
        >
          {title}
        </div>
        {description && (
          <div
            className="ListComponentItemPromo-information--description"
            style={resizedInformationFontSize}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        )}
        {duration && (
          <div
            style={resizedInformationFontSize}
            className="ListComponentItemPromo-information--duration"
          >
            {duration}
          </div>
        )}
      </div>
    </div>
  );
};
