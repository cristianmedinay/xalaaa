/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel, TimeHelper } from "@xala/common";
import React from "react";

import "./MediaAdditionalInfo.scss";

export interface MediaAdditionalInfoProps {
  media: IMediaModel;
}

export const MediaAdditionalInfo: React.FC<MediaAdditionalInfoProps> = ({
  media,
}) => {
  const mediaAdditionalInformations: string[] = [];

  if (media?.YearNext) {
    mediaAdditionalInformations.push(`${media.YearNext}`);
  }

  if (media.Duration) {
    mediaAdditionalInformations.push(
      `${TimeHelper.formatDuration(media.Duration)}`
    );
  }

  const mediaAdditionalInfo = mediaAdditionalInformations.join(" | ");
  const showAgeRestriction =
    media?.MediaAgeRestrictionValueMin !== undefined &&
    media?.MediaAgeRestrictionValueMin > 0;
  const showSeparator = showAgeRestriction && mediaAdditionalInfo;

  if (!mediaAdditionalInfo && !media.MediaAgeRestrictionValueMin) {
    return null;
  }

  return (
    <div className="MediaAdditionalInfo">
      <div>
        {mediaAdditionalInfo} {showSeparator && "|"}
      </div>
      {showAgeRestriction && (
        <div className="MediaAdditionalInfo__box">
          +{media.MediaAgeRestrictionValueMin}
        </div>
      )}
    </div>
  );
};
