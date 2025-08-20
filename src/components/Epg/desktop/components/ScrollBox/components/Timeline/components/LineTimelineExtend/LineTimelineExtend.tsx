/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEpgTimeMarker } from "@xala/common";
import React, { memo } from "react";

import "./LineTimelineExtend.scss";

export const LineTimelineExtendRaw = () => {
  const { isVisible, position } = useEpgTimeMarker();

  if (!isVisible) return null;

  return (
    <div
      className="epg-desktop-line-extend"
      style={{
        left: `${position}px`,
      }}
    />
  );
};

export const LineTimelineExtend = memo(LineTimelineExtendRaw);
