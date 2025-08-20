/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ImageHelper, ThemeContext, useAnalyticsContext } from "@xala/common";
import React, { useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { MediaDetails, WatchingProgressBar } from "components";
import { ImageWithRatio } from "components/ImageWithRatio";
import resources from "resources/list";

import { IListComponentItemProps } from "../../models";

import "./ListComponentItemHighlight.scss";

export const ListComponentItemHighlight = ({
  ...props
}: IListComponentItemProps) => {
  const { media, isPlaceholder = "false" } = props;

  const contextType = useContext(ThemeContext);

  const { recoClick } = useAnalyticsContext();

  const renderSkeleton = () => {
    const skeletonColor = contextType.themeProvider.getSkeletonColor();

    if (!media) {
      return (
        <div className="ListComponentItemHighlight ListComponentItemHighlight--skeleton">
          <SkeletonTheme color={skeletonColor} highlightColor={skeletonColor}>
            <div className="ListComponentItemHighlight__Skeleton">
              <div style={{ marginBottom: "14px" }}>
                <Skeleton width={"20%"} height="18px" />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Skeleton width={"40%"} height="49px" />
              </div>
              <div style={{ marginBottom: "30px" }}>
                <Skeleton width={"30%"} height="24px" />
              </div>

              <div style={{ marginBottom: "5px" }}>
                <Skeleton width={"50%"} height="18px" />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Skeleton width={"48%"} height="18px" />
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Skeleton width={"49%"} height="18px" />
              </div>
              <div>
                <Skeleton width={"35%"} height="18px" />
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

  const imageSrc = ImageHelper.getHighlightsImageUrl(media?.Images);
  const placeholderSrc = resources.highlightsPlaceholder;

  return (
    <div className="ListComponentItemHighlight">
      <ImageWithRatio
        key={media?.Id}
        width={null}
        height={null}
        contentClassName={"ListComponentItemHighlight__BackgroundWithOverlay"}
        imageSrc={imageSrc || placeholderSrc}
        className={!imageSrc ? "placeholder" : ""}
        onClick={() => {
          recoClick(media);
        }}
      >
        <MediaDetails media={media} isOnHighlight />
      </ImageWithRatio>
      <WatchingProgressBar media={media} borderRadius={0} height={7} />
    </div>
  );
};
