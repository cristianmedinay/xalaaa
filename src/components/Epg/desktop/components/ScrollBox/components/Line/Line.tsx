/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEpgTimeMarker } from "@xala/common";
import React, { memo } from "react";

import "./Line.scss";

const LineRaw = () => {
  const { isVisible, height, position } = useEpgTimeMarker();

  if (!isVisible) return null;

  return (
    <div
      className="epg-desktop-line"
      style={{
        height: `${height}px`,
        left: `${position}px`,
      }}
    />
  );
};

export const Line = memo(LineRaw);

Line.whyDidYouRender = true;
