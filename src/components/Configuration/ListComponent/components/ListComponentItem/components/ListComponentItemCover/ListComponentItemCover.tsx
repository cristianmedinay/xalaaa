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
import React, { useContext, useRef } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

import { Label } from "components";
import { ImageWithPlaceholder } from "components/ImageWithPlaceholder";
import { useElementSize, useHoverState, useStylesOnHover } from "hooks";
import resources from "resources/list";

import { IListComponentItemProps } from "../../models";

import "./ListComponentItemCover.scss";

const itemMargin = 12.5;

export const ListComponentItemCover = ({
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

  const renderSkeleton = () => {
    const skeletonColor = themeProvider.getSkeletonColor();
    if (!media) {
      return (
        <div className="ListComponentItemCover-container ListComponentItemCover-container--skeleton">
          <SkeletonTheme color={skeletonColor} highlightColor={skeletonColor}>
            <div className="ListComponentItemCover-skeleton" />
          </SkeletonTheme>
        </div>
      );
    }
    return <></>;
  };
  if (!media || isPlaceholder) {
    return renderSkeleton();
  }

  const coverImageUrl = ImageHelper.getCoverImageUrl(media?.Images);

  return (
    <div
      className="ListComponentItemCover"
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
      <div className="ListComponentItemCover-image-container">
        <ImageWithPlaceholder
          imageSrc={coverImageUrl}
          imageContainerClassName="ListComponentItemCover-image"
          placeholderSrc={resources.coverPlaceholder}
          cellType={CellType.Cover}
          alt={media.Title}
        />
      </div>
    </div>
  );
};
