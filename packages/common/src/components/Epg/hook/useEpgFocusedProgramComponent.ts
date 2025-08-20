/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useCallback, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import {
  useEpgFocusedTimelinePositionDispatch,
  useEpgScrollContainerDispatch,
} from "../context";
import { TimelineChannel, TimelineProgram } from "../types";

interface useEpgFocusedProgramComponentParams {
  channel: TimelineChannel;
  program: TimelineProgram;
}

export const useEpgFocusedProgramComponent = (
  params: useEpgFocusedProgramComponentParams
) => {
  const {
    program: timelineProgram,
    channel: { position: channelPosition },
  } = params;

  const { position: programPosition } = timelineProgram;

  const [focused, setFocused] = useState<boolean>(false);

  const { onProgramFocused } = useEpgScrollContainerDispatch();
  const { setFocusedTimelinePosition } =
    useEpgFocusedTimelinePositionDispatch();

  const onFocus = useCallback(() => {
    unstable_batchedUpdates(() => {
      onProgramFocused(programPosition, channelPosition);
      setFocusedTimelinePosition(timelineProgram.position);
      setFocused(true);
    });
  }, [
    onProgramFocused,
    programPosition,
    channelPosition,
    setFocusedTimelinePosition,
    timelineProgram,
  ]);

  const onBlur = useCallback(() => setFocused(false), []);

  return {
    focused,
    onFocus,
    onBlur,
  };
};
