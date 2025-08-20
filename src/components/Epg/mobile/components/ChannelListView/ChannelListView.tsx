/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  EpgChannel,
  TimeHelper,
  TimelineChannel,
  useEpgContent,
  useEpgDay,
} from "@xala/common";
import React from "react";

import "./ChannelListView.scss";
import { Channel } from "./components";

interface ChannelListViewProps {
  onChannelSelect: (channel: EpgChannel) => void;
  children: React.ReactNode;
}

export const ChannelListView = (props: ChannelListViewProps) => {
  const { onChannelSelect, children } = props;

  const { channels, programs } = useEpgContent();
  const { currentDay } = useEpgDay();

  const currentTime = TimeHelper.getCurrentDateTime();
  const date = TimeHelper.replaceTime(currentDay, currentTime);

  const renderChannel = (channel: TimelineChannel): React.ReactNode => {
    const currentProgram = programs.find(
      (program) =>
        program.program.channelId === channel.channel.id &&
        TimeHelper.isBetween(date, program.program.since, program.program.till)
    );

    return (
      <Channel
        key={channel.channel.id}
        channel={channel}
        currentProgram={currentProgram}
        onChannelSelect={onChannelSelect}
      />
    );
  };

  return (
    <>
      {children}
      <div className="epg-mobile-channel-list">
        {channels.map(renderChannel)}
      </div>
    </>
  );
};
