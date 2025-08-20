/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  AssetType,
  IAppState,
  IMediaModel,
  MediaHelper,
  ROUTES,
} from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { LoginRequiredModal } from "../../components";
import PlayFilledIcon from "../../resources/icons/play-filled.svg";
import CartIcon from "../../resources/icons/shopping_cart.svg";

export interface IPlayInlineButtonProps {
  media?: IMediaModel;
}

export const PlayInlineButton: React.FC<IPlayInlineButtonProps> = (props) => {
  const { media } = props;
  const { t } = useTranslation();
  const isPackage = media?.MediaTypeCode === AssetType.Package;
  const isProductOwnedByUser = useSelector<IAppState, boolean>((state) =>
    MediaHelper.isUserOwnMedia(state.auth.user, media)
  );
  const isLoggedIn = useSelector<IAppState, boolean>(
    (state) => !!state.auth.user?.Id && state.auth.user.Id > 0
  );

  if (!media || (isPackage && isProductOwnedByUser)) {
    return null;
  }

  if (isProductOwnedByUser) {
    return (
      <Link
        to={`${ROUTES.PLAYER_SCREEN}/${media.Id}`}
        className="MediaInfo__action MediaInfo__action--watch"
      >
        <i className="MediaInfo__action-icon">
          <PlayFilledIcon />
        </i>
        <span>{t("COMMON__BUTTON_WATCH", "Watch now")}</span>
      </Link>
    );
  }

  if (isLoggedIn) {
    return (
      <Link
        to={`${ROUTES.BUY_SCREEN}/${media.Id}`}
        className="MediaInfo__action MediaInfo__action--watch"
      >
        <i className="MediaInfo__action-icon">
          <CartIcon />
        </i>
        <span>{t("COMMON__BUTTON_BUY_ASSET", "Buy Asset")}</span>
      </Link>
    );
  }

  return (
    <LoginRequiredModal>
      <div className="MediaInfo__action MediaInfo__action--watch">
        <i className="MediaInfo__action-icon">
          <CartIcon />
        </i>
        <span>{t("COMMON__BUTTON_BUY_ASSET", "Buy Asset")}</span>
      </div>
    </LoginRequiredModal>
  );
};
