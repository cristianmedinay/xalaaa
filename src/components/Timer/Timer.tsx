/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useEffect } from "react";
import { useState } from "react";

import { TimerProps } from "./Timer.types";
import "./Timer.scss";

import { useTranslation } from "react-i18next";
import { TimeHelper } from "@xala/common";

export const Timer = ({ endDate, onTimeout }: TimerProps) => {
  const { t } = useTranslation();
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>();

  useEffect(() => {
    const now = TimeHelper.getCurrentDateTime();
    const diffInSeconds = Math.abs(TimeHelper.diff(now, endDate, "seconds"));

    if (TimeHelper.isBeforeCurrent(endDate)) {
      setMinutes(undefined);
      setSeconds(undefined);
      return;
    }

    let min = Math.floor(diffInSeconds / 60);
    let sec = diffInSeconds % 60;

    setMinutes(min);
    setSeconds(sec);

    const interval = setInterval(() => {
      sec--;
      if (sec <= -1 && min > 0) {
        sec = 59;
        min--;
      }

      setMinutes(min);
      setSeconds(sec);

      if (min <= 0 && sec <= 0) {
        clearInterval(interval);
        onTimeout?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  if (minutes === undefined || seconds === undefined) {
    return null;
  }

  return (
    <div className="Timer">
      <span className="Timer__minutes">{minutes}</span>
      <span className="Timer__divider">:</span>
      <span className="Timer__seconds">{("0" + seconds).slice(-2)}</span>
      <span> {t("PAYMENT_PROCESSING__TIMER_UNIT")}</span>
    </div>
  );
};
