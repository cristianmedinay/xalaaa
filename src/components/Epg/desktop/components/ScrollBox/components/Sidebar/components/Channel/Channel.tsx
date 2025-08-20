/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { EpgChannelComponentProps, useEpgActiveChannel } from "@xala/common";
import cx from "classnames";
import React, { memo } from "react";

import { ImageWithPlaceholder } from "components/ImageWithPlaceholder";
import resources from "resources/list";

import "./Channel.scss";

const ChannelRaw = (props: EpgChannelComponentProps) => {
  const {
    channel: { channel, position },
  } = props;

  const { logo, title, id } = channel;
  const { height, top } = position;

  const { channelId } = useEpgActiveChannel();
  const isActive = id === channelId;

  const channelClasses = cx("epg-desktop-channel", {
    ["epg-desktop-channel-active"]: isActive,
  });

  return (
    <div
      className={channelClasses}
      style={{
        height: `${height}px`,
        top: `${top}px`,
      }}
    >
      <div className="epg-desktop-channel-logo">
        <ImageWithPlaceholder
          imageSrc={logo}
          placeholderSrc={resources.coverPlaceholder}
          alt={title}
        />
      </div>

      <div className="epg-desktop-channel-title">{title}</div>
    </div>
  );
};

export const Channel = memo(ChannelRaw);

Channel.displayName = "Channel";
