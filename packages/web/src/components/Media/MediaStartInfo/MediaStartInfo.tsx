/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AssetType, IMediaModel, MediaType, TimeHelper } from "@xala/common";
import React from "react";

import "./MediaStartInfo.scss";

import { useTranslation } from "react-i18next";

export interface IMediaStartInfoProps {
  media: IMediaModel;
}

export const MediaStartInfo = (props: IMediaStartInfoProps) => {
  const { media } = props;

  const { t } = useTranslation();

  if (
    (media.MediaTypeCode === AssetType.Live ||
      media.MediaTypeCode === AssetType.Event ||
      media.MediaTypeCode === AssetType.Program ||
      media.MediaTypeCode === MediaType.MovieNight ||
      media.MediaTypeCode === MediaType.VideoPremiere) &&
    media.StartDateTime
  ) {
    return (
      <div className="MediaStartInfo">
        {t("MODEL_AVAILABLE_FROM")}{" "}
        {TimeHelper.formatAvailabilityFrom(media.StartDateTime)}
      </div>
    );
  }

  return null;
};
