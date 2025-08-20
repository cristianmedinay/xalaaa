/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { EpgChannel } from "@xala/common";
import React, { useCallback, useState } from "react";

import { ChannelListView, ChannelTimelineView, Container } from "./components";

type EpgMobileViewState =
  | {
      type: "CHANNEL_LIST";
    }
  | {
      type: "CHANNEL_TIMELINE";
      channel: EpgChannel;
    };

interface EpgMobileViewProps {
  children: React.ReactNode;
}

export const EpgMobileView = (props: EpgMobileViewProps) => {
  const { children } = props;

  const [state, setState] = useState<EpgMobileViewState>({
    type: "CHANNEL_LIST",
  });

  const showChannelList = async () => setState({ type: "CHANNEL_LIST" });

  const showChannelTimeline = async (channel: EpgChannel) =>
    setState({
      type: "CHANNEL_TIMELINE",
      channel,
    });

  const renderStateView = useCallback(() => {
    // restore view position on top before switching views
    document.body.scrollTo({
      top: 0,
    });

    switch (state.type) {
      case "CHANNEL_LIST":
        return (
          <ChannelListView onChannelSelect={showChannelTimeline}>
            {children}
          </ChannelListView>
        );
      case "CHANNEL_TIMELINE":
        return (
          <ChannelTimelineView
            channel={state.channel}
            onBackToChannelList={showChannelList}
          />
        );
      default:
        return null;
    }
  }, [children, state]);

  return <Container>{renderStateView()}</Container>;
};
