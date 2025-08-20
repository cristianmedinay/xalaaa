/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  TimelineChannel,
  useEpgContent,
  useEpgScrollContainerVisibility,
} from "@xala/common";
import React, { memo } from "react";

import { Channel } from "./components";
import "./Sidebar.scss";

const SidebarRaw = React.forwardRef<HTMLDivElement>((_, sidebarRef) => {
  const { isChannelVisible } = useEpgScrollContainerVisibility();
  const { channels } = useEpgContent();

  const renderChannel = (channel: TimelineChannel): React.ReactNode => {
    const isVisible = isChannelVisible(channel.position);

    return isVisible && <Channel key={channel.channel.id} channel={channel} />;
  };

  return (
    <div className="epg-desktop-sidebar" ref={sidebarRef}>
      {channels.map(renderChannel)}
    </div>
  );
});

export const Sidebar = memo(SidebarRaw);
