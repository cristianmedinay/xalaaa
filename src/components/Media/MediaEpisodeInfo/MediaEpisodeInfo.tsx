/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel, MEDIA_TYPE_SEASON } from "@xala/common";
import React from "react";
import { Trans } from "react-i18next";

import "./MediaEpisodeInfo.scss";

export interface MediaEpisodeInfo {
  media?: IMediaModel;
}

export const MediaEpisodeInfo: React.FC<MediaEpisodeInfo> = ({ media }) => {
  let episodeInfo;

  if (!media) {
    return null;
  }

  if (media.OrderInParent) {
    if (media.ParentOrderInParent) {
      episodeInfo = (
        <Trans
          i18nKey="LIST__SEASON_EPISODE_NUMBER"
          defaults="S{{seasonNumber}}:E{{episodeNumber}}"
          values={{
            seasonNumber: media.ParentOrderInParent,
            episodeNumber: media.OrderInParent,
          }}
        />
      );
    } else if (media.MediaTypeCode === MEDIA_TYPE_SEASON) {
      episodeInfo = (
        <Trans
          i18nKey="ASSET_TYPE_SEASON"
          defaults="Season"
          values={{
            episodeNumber: media.OrderInParent,
          }}
        />
      );
    } else {
      episodeInfo = (
        <Trans
          i18nKey="LIST__EPISODE_NUMBER"
          defaults="Episode {{episodeNumer}}"
          values={{
            episodeNumber: media.OrderInParent,
          }}
        />
      );
    }
  }

  if (!episodeInfo) {
    return null;
  }

  return <div className="MediaEpisodeInfo Uppercase">{episodeInfo}</div>;
};
