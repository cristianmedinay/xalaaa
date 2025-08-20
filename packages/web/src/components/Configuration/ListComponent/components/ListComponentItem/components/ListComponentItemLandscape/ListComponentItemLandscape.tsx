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

import "./ListComponentItemLandscape.scss";

const itemMargin = 12.5;

export const ListComponentItemLandscape = ({
  media,
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
      <div className="ListComponentItemLandscape-container ListComponentItemLandscape-container--skeleton">
        <SkeletonTheme color={skeletonColor} highlightColor={skeletonColor}>
          <div className="ListComponentItemLandscape-skeleton" />
        </SkeletonTheme>
      </div>
    );
  };
  if (!media) {
    return renderSkeleton();
  }

  const landscapeImageUrl = ImageHelper.getLandscapeImageUrl(media?.Images);

  return (
    <div
      className="ListComponentItemLandscape"
      onClick={() => {
        recoClick(media);
        RouteHelper.handleClickFromListComponentItem(media);
      }}
      style={{
        ...stylesOnHover,
        marginLeft: `${itemMargin}px`,
        marginRight: `${itemMargin}px`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
    >
      <Label media={media} />
      <div className="ListComponentItemLandscape-image-container">
        <ImageWithPlaceholder
          imageSrc={landscapeImageUrl}
          imageContainerClassName="ListComponentItemLandscape-image"
          placeholderSrc={resources.framePlaceholder}
          cellType={CellType.Landscape}
          alt={media.Title}
        />
      </div>
    </div>
  );
};
