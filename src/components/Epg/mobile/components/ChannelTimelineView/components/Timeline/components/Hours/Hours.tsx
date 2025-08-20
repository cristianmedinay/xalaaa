/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEpgDay, useEpgTimelineComponent } from "@xala/common";
import cx from "classnames";
import React from "react";

import "./Hours.scss";

interface HoursProps {
  hourWidth: number;
  dayHeight: number;
}

export const Hours = (props: HoursProps) => {
  const { hourWidth, dayHeight } = props;

  const { startOfDayOffsetHours } = useEpgDay();

  const { hours, formatTime } = useEpgTimelineComponent();

  const renderTime = (index: number) => {
    const fullTime = formatTime(index + startOfDayOffsetHours);
    const halfTime = formatTime(index + startOfDayOffsetHours, true);

    const fullHourStyle = cx(
      "epg-mobile-timeline-hours-item-time",
      "epg-mobile-timeline-hours-item-time-full-hour",
      {
        ["epg-mobile-timeline-hours-item-time-full-hour-align"]: index > 0,
      }
    );

    const halfHourStyle = cx(
      "epg-mobile-timeline-hours-item-time",
      "epg-mobile-timeline-hours-item-time-half-hour"
    );

    return (
      <div
        key={index}
        className="epg-mobile-timeline-hours-item"
        style={{ height: `${hourWidth}px` }}
      >
        <div className={fullHourStyle}>{fullTime}</div>
        <div className={halfHourStyle}>{halfTime}</div>
      </div>
    );
  };

  return (
    <div
      className="epg-mobile-timeline-hours"
      style={{ height: `${dayHeight}px` }}
    >
      {hours.map((_, index) => renderTime(index))}
    </div>
  );
};
