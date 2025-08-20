/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AssetType, IMediaModel, TimeHelper } from "@xala/common";
import React from "react";

import "./MediaAvailabilityDate.scss";

export interface IMediaAvailabilityDateProps {
  media: IMediaModel;
}

export const MediaAvailabilityDate = (props: IMediaAvailabilityDateProps) => {
  const { media } = props;

  if (
    (media.MediaTypeCode === AssetType.Live ||
      media.MediaTypeCode === AssetType.Program) &&
    media.AvailableFrom
  ) {
    return (
      <div className="MediaAvailabilityDate">
        {TimeHelper.formatAvailabilityDate(
          media.AvailableFrom,
          media.AvailableTo
        )}
      </div>
    );
  }

  return null;
};
