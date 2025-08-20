/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IMediaModel,
  RouteHelper,
  StringHelper,
  useAnalyticsContext,
} from "@xala/common";
import React, { memo } from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import { MediaButtonVariant } from "enums";

import ClipboardIcon from "../../resources/icons/clipboard.svg";
import { MediaButton } from "../MediaButton";
import { Tooltip } from "../Tooltip";

export interface IClipboardCopyButton extends WithTranslation {
  media: IMediaModel;
}

export const ClipboardCopyButton = withTranslation()(
  memo(({ t, media }: IClipboardCopyButton) => {
    const { share } = useAnalyticsContext();
    const onClick = () => {
      share();

      const urlToShare =
        window.location.origin +
        "/share" +
        RouteHelper.getDetailsPath(media) +
        `/${StringHelper.stringToSlug(media.Title || "")}`;

      navigator.clipboard.writeText(urlToShare);
    };

    return (
      <Tooltip title={t("ASSET_COPY_LINK_TO_CLIPBOARD")} trigger="click">
        <MediaButton
          variant={MediaButtonVariant.Transparent}
          icon={<ClipboardIcon />}
          iconElevated={true}
          onClick={onClick}
          tooltip={t("SHARE")}
        />
      </Tooltip>
    );
  })
);
