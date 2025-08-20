/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimeHelper } from "@xala/common";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { MediaButtonVariant } from "enums";

import { IMediaButtonProps, MediaButton } from "./MediaButton";

dayjs.extend(relativeTime);

export interface ILiveWatchButtonProps extends IMediaButtonProps {
  availableFrom?: string;
  availableTo?: string;
}

export const LiveWatchButton = ({
  availableFrom,
  availableTo,
  children,
  ...restProps
}: ILiveWatchButtonProps) => {
  const { t } = useTranslation();
  const [updateButton, setUpdateButton] = useState(0);
  const currentDatetime = dayjs();

  const millisToMinutes = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    return minutes;
  };
  const compareTimeValuesBeforeMovieStarted =
    currentDatetime.diff(availableFrom);
  const compareTimeValuesAfterMovieEnded = currentDatetime.diff(availableTo);

  const updateButtonFrequencyBeforeEventStarted =
    millisToMinutes(compareTimeValuesBeforeMovieStarted) > -45 &&
    millisToMinutes(compareTimeValuesBeforeMovieStarted) <= 1;

  const updateButtonFrequencyAfterEventEnded =
    millisToMinutes(compareTimeValuesAfterMovieEnded) >= 0 &&
    millisToMinutes(compareTimeValuesAfterMovieEnded) <= 45;

  useEffect(() => {
    let intervalID: NodeJS.Timeout | undefined;
    if (
      updateButtonFrequencyBeforeEventStarted ||
      updateButtonFrequencyAfterEventEnded
    ) {
      intervalID = setInterval(() => {
        setUpdateButton((prevState) => prevState + 1);
      }, 30 * 1000);
    }
    return () => {
      if (intervalID) {
        clearInterval(intervalID);
      }
    };
  }, [updateButton]);

  if (availableFrom && currentDatetime.isBefore(dayjs(availableFrom))) {
    return (
      <MediaButton variant={MediaButtonVariant.Transparent} disabled>
        {TimeHelper.formatRelativeDateInRange(
          t("LIVE__BROADCAST_WILL_START", "Broadcast will start"),
          t("LIVE__BROADCAST_ENDED", "Broadcast ended"),
          availableFrom,
          availableTo
        )}
      </MediaButton>
    );
  } else {
    return (
      <MediaButton {...restProps} tooltip={t("PLAY")}>
        {children}
      </MediaButton>
    );
  }
};
