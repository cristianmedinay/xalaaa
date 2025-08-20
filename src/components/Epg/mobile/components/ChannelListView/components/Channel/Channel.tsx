/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  EpgChannelComponentProps as BaseEpgChannelComponentProps,
  EpgChannel,
  TimeHelper,
  TimelineProgram,
} from "@xala/common";
import React, { useMemo } from "react";

import { ImageWithPlaceholder } from "components/ImageWithPlaceholder";
import resources from "resources/list";

import "./Channel.scss";

interface EpgChannelComponentProps extends BaseEpgChannelComponentProps {
  currentProgram: TimelineProgram | undefined;
  onChannelSelect: (channel: EpgChannel) => void;
}

const TIME_FORMAT = "HH:mm";

export const Channel = (props: EpgChannelComponentProps) => {
  const {
    channel: { channel },
    currentProgram,
    onChannelSelect,
  } = props;

  const { logo, title } = channel;
  const { since, till } = currentProgram?.program || {};

  const [sinceTime, tillTime] = useMemo(() => {
    const sinceTime = since ? TimeHelper.format(since, TIME_FORMAT) : "";
    const tillTime = till ? TimeHelper.format(till, TIME_FORMAT) : "";

    return [sinceTime, tillTime];
  }, [since, till]);

  const onClick = () => onChannelSelect(channel);

  return (
    <div className="epg-mobile-channel" onClick={onClick}>
      <div className="epg-mobile-channel-logo">
        <ImageWithPlaceholder
          imageSrc={logo}
          placeholderSrc={resources.coverPlaceholder}
          alt={title}
        />
      </div>

      <div className="epg-mobile-channel-metadata">
        <p>{title}</p>
        {currentProgram && (
          <div className="epg-mobile-channel-metadata-program">
            <p>{currentProgram.program.title}</p>
            <span>
              {sinceTime} - {tillTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
