/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IAppState,
  IMediaModel,
  MediaHelper,
  RouteHelper,
  StorageManager,
  TimeHelper,
} from "@xala/common";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { LoginRequiredModal, MediaIcon } from "../../components";
import PlayFilledIcon from "../../resources/icons/play-filled.svg";
import CartIcon from "../../resources/icons/shopping_cart.svg";

export interface IPlayIconButtonProps {
  media?: IMediaModel;
  style?: React.CSSProperties;
}

export const PlayIconButton = (props: IPlayIconButtonProps) => {
  const { media, style } = props;
  const [isLoggedIn, setIsLoggedIn] = useState();
  const isProductOwnedByUser = useSelector<IAppState, boolean>((state) =>
    MediaHelper.isUserOwnMedia(state.auth.user, media)
  );
  const isAuthUserLoggedIn = isLoggedIn && isLoggedIn > 0 ? true : false;

  const getUserId = async () => {
    const userId = await StorageManager.getValue("userId");
    setIsLoggedIn(userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  if (!media) {
    return null;
  }

  const currentDate = TimeHelper.getCurrentDate();
  const { StartDateTime, EndDateTime } = media;
  const isBeforeOrAfterAvailableDate =
    (StartDateTime && currentDate.isBefore(StartDateTime)) ||
    (EndDateTime && currentDate.isAfter(EndDateTime));
  const isAvailable = !isBeforeOrAfterAvailableDate;

  if (isAuthUserLoggedIn) {
    if (!isProductOwnedByUser) {
      return (
        <MediaIcon
          hideIcon={!isAvailable}
          style={style}
          onIconClick={() => RouteHelper.goToBuyAsset(media?.Id)}
          onBackgroundClick={() => RouteHelper.goToDetails(media)}
        >
          <CartIcon />
        </MediaIcon>
      );
    }
    if (isProductOwnedByUser) {
      return (
        <MediaIcon
          hideIcon={!isAvailable}
          style={style}
          onIconClick={() => RouteHelper.goToPlayer(media)}
          onBackgroundClick={() => RouteHelper.goToDetails(media)}
        >
          <PlayFilledIcon />
        </MediaIcon>
      );
    }
  }

  return (
    <LoginRequiredModal>
      {({ toggleModal }) => (
        <MediaIcon
          hideIcon={!isAvailable}
          style={style}
          onIconClick={toggleModal}
          onBackgroundClick={() => RouteHelper.goToDetails(media)}
        >
          <CartIcon />
        </MediaIcon>
      )}
    </LoginRequiredModal>
  );
};
