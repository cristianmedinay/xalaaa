/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { EpgChannel, useEpgContent } from "@xala/common";
import React, { useMemo } from "react";

import "./ChannelTimelineView.scss";
import { ChannelHeader, DaySwitcher, Timeline } from "./components";

interface ChannelTimelineViewProps {
  channel: EpgChannel;
  onBackToChannelList: () => void;
}

export const ChannelTimelineView = (props: ChannelTimelineViewProps) => {
  const { channel, onBackToChannelList } = props;

  const { programs } = useEpgContent();

  const channelPrograms = useMemo(
    () =>
      programs.filter((program) => program.program.channelId === channel.id),
    [channel.id, programs]
  );

  return (
    <div className="epg-mobile-channel-timeline">
      <ChannelHeader
        channel={channel}
        onBackToChannelList={onBackToChannelList}
      />
      <DaySwitcher />
      <Timeline programs={channelPrograms} />
    </div>
  );
};
