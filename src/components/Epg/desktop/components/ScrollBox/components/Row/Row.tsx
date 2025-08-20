/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ChannelId,
  TimelineProgram,
  useEpgConfiguration,
  useEpgRowComponent,
} from "@xala/common";
import cx from "classnames";
import React, { memo, useCallback, useMemo } from "react";

import { Program } from "./components";
import "./Row.scss";

interface RowProps {
  channelId: ChannelId;
  programs: TimelineProgram[];
}

const RowRaw = (props: RowProps) => {
  const { channelId, programs } = props;

  const { lineHeight } = useEpgConfiguration();

  const topPosition = useMemo(() => programs[0].position.top, [programs]);

  const renderProgram = useCallback(
    (program: TimelineProgram): React.ReactNode => {
      return <Program key={program.program.id} program={program} />;
    },
    []
  );

  const { activeChannelId, onMouseEnter, onMouseLeave, programsRendered } =
    useEpgRowComponent({ channelId, programs, renderProgram });

  const classes = cx("epg-desktop-row", {
    ["epg-desktop-row-active"]: channelId === activeChannelId,
  });

  return (
    <div
      className={classes}
      style={{ height: `${lineHeight}px`, top: `${topPosition} px` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {programsRendered}
    </div>
  );
};

export const Row = memo(RowRaw);
