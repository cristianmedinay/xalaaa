/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel } from "@xala/common";
import React from "react";
import { useHistory } from "react-router";

import { HeaderLogo } from "components/AppHeader/components";
import { MediaAdditionalInfo } from "components/Media";
import LeftArrowIcon from "resources/icons/left-arrow.svg";

import "./AssetInfoOverlay.scss";

export interface AssetInfoOverlayProps {
  media: IMediaModel;
  isVisible: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const AssetInfoOverlay = ({
  media,
  isVisible,
  onClick,
}: AssetInfoOverlayProps) => {
  const history = useHistory();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };

  const goBack = () => {
    history.goBack();
  };

  if (!media || !media.MediaTypeCode) {
    return null;
  }

  return isVisible ? (
    <div className="AssetInfoOverlay__Background" onClick={handleClick}>
      <div className="AssetInfoOverlay__Header">
        <span className="AssetInfoOverlay__Header--backIcon" onClick={goBack}>
          <LeftArrowIcon />
        </span>
        <HeaderLogo className="AssetInfoOverlay__Header--logo" />
      </div>
      <div className="AssetInfoOverlay__Container">
        <div className="AssetInfoOverlay__Content">
          <h1 className="AssetInfoOverlay__Title">{media.Title}</h1>
          <MediaAdditionalInfo media={media} />
          <div
            className="AssetInfoOverlay__Description"
            dangerouslySetInnerHTML={{
              __html: media.Description || "",
            }}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default AssetInfoOverlay;
