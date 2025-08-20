/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel, MediaStreamType, ROUTES, UrlHelper } from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { MediaButton } from "components";
import { MediaButtonVariant } from "enums";
import TrailerIcon from "resources/icons/trailer.svg";

export interface ITrailerButtonProps {
  media?: IMediaModel;
}

export const TrailerButton = (props: ITrailerButtonProps) => {
  const { media } = props;
  const { t } = useTranslation();

  if (!media || !media.IsTrialContentAvailable) {
    return null;
  }

  const urlToTrial = UrlHelper.parametrize(
    `${ROUTES.PLAYER_SCREEN}/${media.Id}`,
    { streamType: MediaStreamType.Trial }
  );

  return (
    <Link to={urlToTrial}>
      <MediaButton
        icon={<TrailerIcon />}
        iconElevated
        variant={MediaButtonVariant.Transparent}
        trailer
        tooltip={t("PLAY_TRILER")}
      />
    </Link>
  );
};
