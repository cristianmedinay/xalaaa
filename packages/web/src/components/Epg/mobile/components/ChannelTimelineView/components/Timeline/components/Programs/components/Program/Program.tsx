/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  TimelineProgram,
  useEpgConfiguration,
  useEpgProgramComponent,
} from "@xala/common";
import React from "react";

import "./Program.scss";

interface ProgramProps {
  program: TimelineProgram;
  hourHeight: number;
}

export const Program = (props: ProgramProps) => {
  const { program: timelineProgram, hourHeight } = props;

  const { program, position: programPosition } = timelineProgram;
  const { width, left } = programPosition;
  const { title } = program;

  const { verticalTimeScale } = useEpgConfiguration();
  const { sinceTime, tillTime, handleOnClick } = useEpgProgramComponent({
    timelineProgram,
  });

  const scaledHeight = width * verticalTimeScale;
  const scaledTop = left * verticalTimeScale;
  const halfHourHeight = hourHeight / 2;

  return (
    <div
      className="epg-mobile-program"
      style={{
        top: `${scaledTop}px`,
        height: `${scaledHeight}px`,
      }}
      onClick={handleOnClick}
    >
      <div
        className="epg-mobile-program-content"
        style={{
          alignItems: scaledHeight > halfHourHeight ? "flex-start" : "center",
        }}
      >
        <div className="epg-mobile-program-content-metadata">
          <p>{title}</p>
          <span>
            {sinceTime} - {tillTime}
          </span>
        </div>
      </div>
    </div>
  );
};
