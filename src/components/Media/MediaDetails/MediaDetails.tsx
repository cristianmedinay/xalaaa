/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel, MediaType, RouteHelper } from "@xala/common";
import React, { useCallback } from "react";

import { Label } from "components";
import getAbsoluteParent from "helpers/parentsHelper";
import Plus from "resources/icons/Plus.svg";

import "./MediaDetails.scss";
import { removeParentTitle } from "helpers/textHelper";

interface IMediaDetailsProps {
  media: IMediaModel;
  isOnHighlight?: boolean;
}

export const MediaDetails = ({ media, isOnHighlight }: IMediaDetailsProps) => {
  const {
    Title,
    ShortDescription,
    Genre,
    MediaTypeCode,
    ParentMedia,
    Label: label,
  } = media || {};

  const goToDetails = useCallback(
    () => RouteHelper.handleClickFromListComponentItem(media),
    [media]
  );

  return (
    <div className="Container" onClick={goToDetails}>
      <div className="Container__content">
        <div className="Container__wrapper">
          {Genre && <p className="Container__category">{Genre}</p>}
          {MediaTypeCode === MediaType.Event ||
          MediaTypeCode === MediaType.Program ? (
            <Label
              media={media}
              isOnHighlight={isOnHighlight}
              showTime={true}
            />
          ) : (
            <Label media={media} isOnHighlight={isOnHighlight} />
          )}
        </div>
        {(MediaTypeCode === MediaType.Podcast ||
          MediaTypeCode === MediaType.Episode) && (
          <p className="Container__parent">
            {ParentMedia && getAbsoluteParent(ParentMedia)}
          </p>
        )}
        {MediaTypeCode === MediaType.Event && (
          <p className="Container__label">{label}</p>
        )}
        <h2 className="Container__title">{removeParentTitle(Title)}</h2>
        <p
          className="Container__description"
          dangerouslySetInnerHTML={{ __html: ShortDescription || "" }}
        />
        <div className="Container__buttons">
          <div className="Container__buttons_redirect">
            <Plus />
          </div>
        </div>
      </div>
    </div>
  );
};
