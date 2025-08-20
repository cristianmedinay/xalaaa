/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IMediaModel, MediaType, TimeHelper } from "@xala/common";
import cx from "classnames";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  getTime,
  isToday,
  isTomorrow,
  isYesterday,
  translateTime,
} from "helpers/dateHelpers";
import { convertIntoShorterText } from "helpers/textHelper";

import "./Label.scss";

export interface LabelProps {
  media: IMediaModel;
  isOnHighlight?: boolean;
  showTime?: boolean;
}

export const Label = ({
  media,
  isOnHighlight,
  showTime = false,
}: LabelProps) => {
  const { t, i18n } = useTranslation();
  const isLive = TimeHelper.isCurrentBetween(
    media?.StartDateTime,
    media?.EndDateTime
  );
  const showLabel = isLive || !!media?.Label || showTime;

  function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
  }

  const labelText = useMemo(() => {
    let startDate = new Date(media?.StartDateTime as string);

    if (media?.MediaTypeCode === MediaType.Event && media?.EventDateTime) {
      startDate = new Date(media?.EventDateTime as string);
    }

    if (isLive) {
      return convertIntoShorterText(t("ASSET_TYPE_LIVE"), 10);
    }

    if (showTime && isToday(startDate)) {
      return `${capitalize(t("TODAY"))} | ${getTime(startDate)}h`;
    }

    if (showTime && isTomorrow(startDate)) {
      return `${capitalize(t("TOMORROW"))} | ${getTime(startDate)}h`;
    }

    if (showTime && isYesterday(startDate)) {
      return `${capitalize(t("YESTERDAY"))} | ${getTime(startDate)}h`;
    }

    if (showTime) {
      return translateTime({
        date: startDate,
        language: i18n.language,
      });
    }

    return convertIntoShorterText(t(media?.Label as string), 10);
  }, [media?.StartDateTime, media?.Label, i18n.language]);

  if (!showLabel) return null;

  const labelClassName = cx("label", {
    highlightLabel: isOnHighlight,
  });

  return (
    <div className={labelClassName}>
      <div className="label__text">{labelText}</div>
      {isLive && <div className="label__circle"></div>}
    </div>
  );
};
