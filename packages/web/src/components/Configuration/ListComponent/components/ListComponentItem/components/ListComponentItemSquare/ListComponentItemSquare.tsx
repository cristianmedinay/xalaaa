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

import "./ListComponentItemSquare.scss";

import { Label } from "components";

const itemMargin = 12;

export const ListComponentItemSquare = ({
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
    if (!media) {
      return (
        <div className="ListComponentItemSquare-container ListComponentItemSquare-container--skeleton">
          <SkeletonTheme color={skeletonColor} highlightColor={skeletonColor}>
            <div className="ListComponentItemSquare-skeleton" />
          </SkeletonTheme>
        </div>
      );
    }
    return <></>;
  };
  if (!media) {
    return renderSkeleton();
  }
  const squareImageUrl = ImageHelper.getSquareImageUrl(media?.Images);
  return (
    <div
      className="ListComponentItemSquare"
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
      <div className="ListComponentItemSquare-image-container">
        <ImageWithPlaceholder
          imageSrc={squareImageUrl}
          imageContainerClassName="ListComponentItemSquare-image"
          placeholderSrc={resources.coverPlaceholder}
          cellType={CellType.Square}
          alt={media.Title}
        />
      </div>
    </div>
  );
};
