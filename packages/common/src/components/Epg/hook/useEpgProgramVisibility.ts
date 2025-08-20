/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useMemo } from "react";

import { TimelineProgram } from "components/Epg/types";

import { useEpgScrollContainerVisibility } from "../context";

interface useEpgProgramVisibilityParams {
  timelineProgram: TimelineProgram;
}

export const useEpgProgramVisibility = (
  params: useEpgProgramVisibilityParams
) => {
  const { timelineProgram } = params;
  const { position } = timelineProgram;
  const { width } = position;

  const { isProgramVisible } = useEpgScrollContainerVisibility();

  const isVisible = useMemo(
    () => isProgramVisible(position),
    [isProgramVisible, position]
  );

  const renderIcon = useMemo(() => width > 250, [width]);

  return {
    isVisible,
    renderIcon,
  };
};
