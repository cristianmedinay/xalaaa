/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimelineProgram } from "@xala/common";
import React, { useCallback } from "react";

import { Program } from "./components";
import "./Programs.scss";

interface ProgramsProps {
  programs: TimelineProgram[];
  hourWidth: number;
}

export const Programs = (props: ProgramsProps) => {
  const { programs, hourWidth } = props;

  const renderProgram = useCallback(
    (program: TimelineProgram): React.ReactNode => {
      return (
        <Program
          key={program.program.id}
          program={program}
          hourHeight={hourWidth}
        />
      );
    },
    [hourWidth]
  );

  return (
    <div className="epg-mobile-timeline-programs">
      {programs
        .sort((p1, p2) => (p1.position.left > p2.position.left ? 1 : -1))
        .map((program) => renderProgram(program))}
    </div>
  );
};
