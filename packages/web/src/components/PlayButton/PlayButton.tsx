/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IMediaModel,
  MediaType,
  RouteHelper,
  TimeHelper,
  useIsLoggedIn,
  useIsPlayerAvailable,
  useIsUserBoughtProduct,
} from "@xala/common";
import React from "react";

import { LiveWatchButton, LoginRequiredModal } from "components";
import { MediaButtonVariant } from "enums";
import PlayIcon from "resources/icons/play.svg";
import ShoppingCart from "resources/icons/shopping_cart.svg";

export interface IPlayButtonProps {
  media: IMediaModel;
}

export const PlayButton = ({ media }: IPlayButtonProps) => {
  const isLoggedIn = useIsLoggedIn();
  const { isStreamable, isSourceAvailable, isAvailable } =
    useIsPlayerAvailable(media);

  const isUserBoughtProduct = useIsUserBoughtProduct(media);

  const isMediaTypePlayable =
    media.MediaTypeCode === MediaType.Program ||
    media.MediaTypeCode === MediaType.Channel ||
    media.MediaTypeCode === MediaType.Live ||
    media.MediaTypeCode === MediaType.Event;

  if (
    !isMediaTypePlayable &&
    (!isAvailable || !isSourceAvailable || !isStreamable) &&
    (media?.IsFree || isUserBoughtProduct)
  ) {
    return null;
  }

  // Do not show play button when no streaming permission
  if (!media.StreamingPermission) {
    return null;
  }

  // TODO Temporary, in future we will probably have paid articles
  if (media.MediaTypeCode === MediaType.Article) {
    return null;
  }

  const isAvailableDateValid =
    media?.MediaTypeCode === MediaType.Program
      ? media?.StartDateTime &&
        TimeHelper.getDateTime(media?.StartDateTime) <=
          TimeHelper.getCurrentDateTime()
      : true;

  const goToPlayer = () => {
    RouteHelper.goToPlayer(media);
  };

  const goToBuyAsset = () => {
    RouteHelper.goToBuyAsset(media.Id);
  };

  // Disable play button for future assets
  if (!isAvailableDateValid) {
    return (
      <LiveWatchButton
        availableFrom={media.StartDateTime}
        availableTo={media.EndDateTime}
        variant={MediaButtonVariant.Primary}
        icon={<PlayIcon />}
        iconElevated={true}
        disabled
      />
    );
  }

  if (isLoggedIn && !media?.IsFree && !isUserBoughtProduct) {
    return (
      <LiveWatchButton
        availableFrom={media.StartDateTime}
        availableTo={media.EndDateTime}
        variant={MediaButtonVariant.Primary}
        icon={<ShoppingCart />}
        iconElevated={true}
        onClick={goToBuyAsset}
      />
    );
  }

  if (isLoggedIn || (media?.AllowUnregistered && media?.IsFree)) {
    return (
      <LiveWatchButton
        availableFrom={media.StartDateTime}
        availableTo={media.EndDateTime}
        variant={MediaButtonVariant.Primary}
        icon={<PlayIcon />}
        iconElevated={true}
        onClick={goToPlayer}
      />
    );
  }

  return (
    <LoginRequiredModal>
      {({ openModal }) => (
        <LiveWatchButton
          variant={MediaButtonVariant.Primary}
          icon={<PlayIcon />}
          iconElevated={true}
          onClick={openModal}
        />
      )}
    </LoginRequiredModal>
  );
};
