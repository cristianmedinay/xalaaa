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

import { ImageWithPlaceholder } from "components/ImageWithPlaceholder";
import { useElementSize, useHoverState, useStylesOnHover } from "hooks";
import resources from "resources/list";

import { IListComponentItemProps } from "../../models";

import "./ListComponentItemRound.scss";

const itemMargin = 8.5;

export const ListComponentItemRound = ({
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
    return (
      <div className="ListComponentItemRound-container ListComponentItemRound-container--skeleton">
        <SkeletonTheme color={skeletonColor} highlightColor={skeletonColor}>
          <div className="ListComponentItemRound-skeleton" />
        </SkeletonTheme>
      </div>
    );
  };

  if (!media || isPlaceholder) {
    return renderSkeleton();
  }

  const roundImageUrl = ImageHelper.getRoundImageUrl(media?.Images);

  return (
    <div
      className="ListComponentItemRound"
      style={{ ...stylesOnHover, margin: `0 ${itemMargin}px` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        recoClick(media);
        RouteHelper.handleClickFromListComponentItem(media);
      }}
      ref={ref}
    >
      <div className="ListComponentItemRound-image-container">
        <ImageWithPlaceholder
          imageSrc={roundImageUrl}
          imageContainerClassName="ListComponentItemRound-image"
          placeholderSrc={resources.coverPlaceholder}
          cellType={CellType.Round}
          alt={media.Title}
        />
      </div>
    </div>
  );
};
