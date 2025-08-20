/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  EpgActiveChannelProvider,
  EpgTimeMarkerProvider,
  useEpgScrollBoxComponent,
} from "@xala/common";
import React, { memo, RefObject } from "react";

import { Line, Row, Sidebar, Timeline } from "./components";
/* import Buttons from "./components/Buttons/Buttons"; */
import "./ScrollBox.scss";

interface ScrollBoxForwardProps {
  timelineHeight: number;
  scrollBoxRef: RefObject<HTMLDivElement>;
  sidebarRef: RefObject<HTMLDivElement>;
  timelineRef: RefObject<HTMLDivElement>;
  handleScroll: () => void;
}

const ScrollBoxRaw = (props: ScrollBoxForwardProps) => {
  const {
    timelineHeight,
    scrollBoxRef,
    sidebarRef,
    timelineRef,
    handleScroll,
  } = props;

  const { groupedPrograms, height, onScroll, dayWidth, isLoading } =
    useEpgScrollBoxComponent({
      scrollBoxRef,
    });

  const renderPrograms = (): React.ReactNode => {
    return groupedPrograms.map(
      (group) =>
        group.items && (
          <Row
            key={group.key}
            channelId={group.items[0].program.channelId}
            programs={group.items}
          />
        )
    );
  };

  /* function scroll(number: number): void {
    //amount to scroll is negative to scroll up
    scrollBoxRef.current?.scrollBy(number, 0);
  } */

  return (
    <div
      className="epg-desktop-scroll-box"
      ref={scrollBoxRef}
      onScroll={onScroll}
      onScrollCapture={handleScroll}
    >
      {!isLoading && (
        <EpgTimeMarkerProvider>
          {/* <Buttons height={timelineHeight} scroll={scroll} /> */}
          <Line />
          <Timeline height={timelineHeight} ref={timelineRef} />
          <EpgActiveChannelProvider>
            <Sidebar ref={sidebarRef} />
            <div
              className="epg-desktop-scroll-box-content"
              style={{
                width: `${dayWidth}px`,
                height: `${height}px`,
              }}
            >
              {renderPrograms()}
            </div>
          </EpgActiveChannelProvider>
        </EpgTimeMarkerProvider>
      )}
    </div>
  );
};

export const ScrollBox = memo(ScrollBoxRaw);

ScrollBox.whyDidYouRender = {
  customName: "ScrollBox",
};
