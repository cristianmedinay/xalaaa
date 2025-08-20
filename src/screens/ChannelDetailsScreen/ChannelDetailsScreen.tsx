/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { IMediaModel, useIdRouteParam } from "@xala/common";
import React, { useCallback } from "react";

import { LoaderSpinner } from "components";

import {
  MediaDetailsScreen,
  useMediaDetailsLoadingSelector,
  useMediaDetailsMediaSelector,
} from "../MediaDetailsScreen";

import { ChannelDetails } from "./ChannelDetails";
import "./ChannelDetailsScreen.scss";

export const ChannelDetailsScreen = () => {
  const mediaId = useIdRouteParam();
  const media = useMediaDetailsMediaSelector();
  const isLoading = useMediaDetailsLoadingSelector();

  const renderChannelDetails = useCallback(
    (media: IMediaModel | undefined): React.ReactNode =>
      isLoading ? (
        <LoaderSpinner />
      ) : (
        <ChannelDetails id={mediaId} media={media} />
      ),
    [isLoading, mediaId]
  );

  return (
    <MediaDetailsScreen media={media}>
      <div className="channelScreenContainer">
        {renderChannelDetails(media)}
      </div>
    </MediaDetailsScreen>
  );
};
