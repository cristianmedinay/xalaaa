/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEpgDay, useEpgTimelineComponent } from "@xala/common";
import cx from "classnames";
import React, { memo } from "react";

import "./Timeline.scss";

interface TimelineProps {
  height: number;
}

const TimelineRaw = React.forwardRef<HTMLDivElement, TimelineProps>(
  (props, timelineRef) => {
    const { height } = props;

    const { dayWidth, hourWidth, startOfDayOffsetHours } = useEpgDay();

    const { hours, formatTime, onScrollToHour } = useEpgTimelineComponent();

    const renderTime = (index: number) => {
      const fullTime = formatTime(index + startOfDayOffsetHours);
      const halfTime = formatTime(index + startOfDayOffsetHours, true);

      const fullHourStyle = cx(
        "epg-desktop-timeline-item-time",
        "epg-desktop-timeline-item-time-full-hour",
        {
          ["epg-desktop-timeline-item-time-full-hour-align"]: index > 0,
        }
      );

      const halfHourStyle = cx(
        "epg-desktop-timeline-item-time",
        "epg-desktop-timeline-item-time-half-hour"
      );

      return (
        <div
          key={index}
          className="epg-desktop-timeline-item"
          style={{ width: `${hourWidth}px`, height: `${height}px` }}
        >
          <div className={fullHourStyle} onClick={() => onScrollToHour(index)}>
            {fullTime}
          </div>
          <div
            className={halfHourStyle}
            onClick={() => onScrollToHour(index, true)}
          >
            {halfTime}
          </div>
        </div>
      );
    };

    return (
      <div
        ref={timelineRef}
        className="epg-desktop-timeline"
        style={{
          width: `${dayWidth}px`,
        }}
      >
        {hours.map((_, index) => renderTime(index))}
      </div>
    );
  }
);

export const Timeline = memo(TimelineRaw);

Timeline.whyDidYouRender = true;
