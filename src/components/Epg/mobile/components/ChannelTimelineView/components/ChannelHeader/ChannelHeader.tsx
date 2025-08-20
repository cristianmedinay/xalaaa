/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { EpgChannel } from "@xala/common";
import React from "react";

import { ImageWithPlaceholder } from "components/ImageWithPlaceholder";
import { MediaButton } from "components/MediaButton";
import { MediaButtonVariant } from "enums";
import LeftArrowIcon from "resources/icons/left-arrow.svg";
import resources from "resources/list";

import "./ChannelHeader.scss";

interface ChannelHeaderProps {
  channel: EpgChannel;
  onBackToChannelList: () => void;
}

export const ChannelHeader = (props: ChannelHeaderProps) => {
  const { channel, onBackToChannelList } = props;

  return (
    <div className="epg-mobile-channel-header">
      <MediaButton
        className={"epg-mobile-channel-header-button"}
        variant={MediaButtonVariant.Transparent}
        icon={<LeftArrowIcon />}
        onClick={onBackToChannelList}
      />

      <div className="epg-mobile-channel-header-logo">
        <ImageWithPlaceholder
          imageSrc={channel.logo}
          placeholderSrc={resources.coverPlaceholder}
          alt={channel.title}
        />
      </div>

      <p>{channel.title}</p>
    </div>
  );
};
