/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  TimelineProgram,
  useEpgProgramComponent,
  useEpgProgramVisibility,
} from "@xala/common";
import React, { useMemo } from "react";

import PlayIcon from "resources/icons/play.svg";

import "./Program.scss";

interface ProgramProps {
  program: TimelineProgram;
}

export const Program = (props: ProgramProps) => {
  const { program: timelineProgram } = props;

  const { program, position: programPosition } = timelineProgram;
  const { width, height, top, left } = programPosition;
  const { title } = program;

  const { sinceTime, tillTime, handleOnClick } = useEpgProgramComponent({
    timelineProgram,
  });

  const { isVisible, renderIcon } = useEpgProgramVisibility({
    timelineProgram,
  });

  return useMemo(
    () => (
      <>
        {isVisible && (
          <div
            className="epg-desktop-program"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              top: `${top}px`,
              left: `${left}px`,
              padding: `${width === 0 ? 0 : 1}px`,
            }}
          >
            <div
              className="epg-desktop-program-content"
              style={{
                padding: `16px ${width < 100 ? 13 : 26}px`,
              }}
              onClick={handleOnClick}
            >
              <div className="epg-desktop-program-content-flex">
                <div className="epg-desktop-program-content-flex-stack">
                  <div className="epg-desktop-program-content-title">
                    {title}
                  </div>
                  <div className="epg-desktop-program-content-second-line">
                    <div className="epg-desktop-program-content-time">
                      {sinceTime} - {tillTime}
                    </div>
                    {renderIcon && (
                      <div className="epg-desktop-program-content-play-icon">
                        <PlayIcon />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    ),
    [
      handleOnClick,
      height,
      isVisible,
      left,
      renderIcon,
      sinceTime,
      tillTime,
      title,
      top,
      width,
    ]
  );
};
