/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useCallback, useMemo } from "react";

import {
  useEpgActiveChannel,
  useEpgContent,
  useEpgScrollContainerVisibility,
} from "../context";
import { ChannelId, TimelineChannel, TimelineProgram } from "../types";

interface useEpgRowComponentParams {
  channelId: ChannelId;
  programs: TimelineProgram[];
  renderProgram: (
    program: TimelineProgram,
    channel: TimelineChannel
  ) => React.ReactNode;
}

export const useEpgRowComponent = (params: useEpgRowComponentParams) => {
  const { channelId, programs, renderProgram } = params;

  const { channels } = useEpgContent();
  const { isChannelVisible } = useEpgScrollContainerVisibility();
  const {
    channelId: activeChannelId,
    setActive,
    clear,
  } = useEpgActiveChannel();

  const channel = useMemo(
    () =>
      channels.find(
        (channel) => channel.channel.id === channelId
      ) as TimelineChannel,
    [channels, channelId]
  );

  const isVisible = useMemo(
    () => isChannelVisible(channel.position),
    [channel.position, isChannelVisible]
  );

  const onMouseEnter = useCallback(
    () => setActive(channelId),
    [channelId, setActive]
  );

  const programsRendered = useMemo(
    () =>
      isVisible &&
      programs
        .sort((p1, p2) => (p1.position.left > p2.position.left ? 1 : -1))
        .map((program) => renderProgram(program, channel)),
    [isVisible, programs, channel, renderProgram]
  );

  const onMouseLeave = useCallback(() => clear(), [clear]);

  return {
    activeChannelId,
    isVisible,
    onMouseEnter,
    onMouseLeave,
    programsRendered,
  };
};
