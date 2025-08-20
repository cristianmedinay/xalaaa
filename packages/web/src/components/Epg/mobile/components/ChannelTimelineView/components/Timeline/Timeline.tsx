/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimelineProgram, useEpgConfiguration, useEpgDay } from "@xala/common";
import React from "react";

import { Hours, Programs } from "./components";
import "./Timeline.scss";

interface TimelineProps {
  programs: TimelineProgram[];
}

export const Timeline = (props: TimelineProps) => {
  const { programs } = props;

  const { verticalTimeScale } = useEpgConfiguration();
  const { dayWidth, hourWidth } = useEpgDay();

  const dayHeight = dayWidth * verticalTimeScale;
  const scaledHourWith = hourWidth * verticalTimeScale;

  return (
    <div className="epg-mobile-timeline">
      <Hours dayHeight={dayHeight} hourWidth={scaledHourWith} />
      <Programs programs={programs} hourWidth={scaledHourWith} />
    </div>
  );
};
