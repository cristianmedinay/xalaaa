/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { EpgScrollContainerProvider, useEpgConfiguration } from "@xala/common";
import React, { useEffect, useRef } from "react";

import { Container, DaySwitcher, ScrollBox } from "./components";
import Buttons from "./components/ScrollBox/components/Buttons/Buttons";

interface EpgDesktopViewProps {
  children: React.ReactNode;
}

export const EpgDesktopView = (props: EpgDesktopViewProps) => {
  const { children } = props;

  const { daySwitcher, useCompactMode } = useEpgConfiguration();

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const docRef = useRef(document);

  const showDaySwitcher = Boolean(daySwitcher);
  const timelineHeight = useCompactMode ? 44 : 84;

  function scroll(number: number): void {
    //amount to scroll is negative to scroll up
    scrollBoxRef.current?.scrollBy(number, 0);
  }

  function handleScroll() {
    if (scrollBoxRef.current && timelineRef.current) {
      if (timelineRef.current.classList.contains("fixed-epg")) {
        timelineRef.current.style.transform = `translateX(-${scrollBoxRef.current.scrollLeft}px)`;
      }
    }
  }

  function adaptHeader() {
    if (containerRef.current) {
      const container_empty = docRef.current.querySelector<HTMLElement>(
        ".epg-desktop-container-empty"
      );
      const container_buttons = docRef.current.querySelector<HTMLElement>(
        ".epg-desktop-buttons"
      );

      const topPosition = containerRef.current.getBoundingClientRect().top;

      if (topPosition <= 0) {
        if (timelineRef.current && scrollBoxRef.current) {
          timelineRef.current.style.width =
            timelineRef.current.offsetWidth + "px";
          timelineRef.current.style.left =
            containerRef.current.offsetLeft + "px";
          timelineRef.current.classList.add("fixed-epg");
          timelineRef.current.style.transform =
            "translateX(-" + scrollBoxRef.current.scrollLeft + "px)";
        }

        if (container_empty && container_buttons) {
          container_empty.style.left = containerRef.current.offsetLeft + "px";
          container_buttons.style.left = containerRef.current.offsetLeft + "px";
          container_empty.classList.add("fixed-epg-elements");
          container_buttons.classList.add("fixed-epg-elements");
          scrollBoxRef.current?.classList.add("fixed-epg-elements");
        }
      } else {
        if (timelineRef.current) {
          timelineRef.current.classList.remove("fixed-epg");
          timelineRef.current.style.left = "0px";
          timelineRef.current.style.transform = "translateX(0px)";
        }

        if (container_empty && container_buttons) {
          container_empty.classList.remove("fixed-epg-elements");
          container_buttons.classList.remove("fixed-epg-elements");
          container_empty.style.left = "0px";
          container_buttons.style.left = "0px";
          scrollBoxRef.current?.classList.remove("fixed-epg-elements");
        }
      }
    }
  }

  useEffect(() => {
    const body = document.querySelector<HTMLElement>("body");

    body?.addEventListener("scroll", adaptHeader);

    return () => {
      body?.removeEventListener("scroll", adaptHeader);
    };
  }, []);

  return (
    <>
      {children}
      {showDaySwitcher && <DaySwitcher />}
      <EpgScrollContainerProvider
        containerRef={containerRef}
        scrollBoxRef={scrollBoxRef}
        sidebarRef={sidebarRef}
      >
        <Container ref={containerRef} timelineHeight={timelineHeight}>
          <Buttons height={timelineHeight} scroll={scroll} />
          <ScrollBox
            scrollBoxRef={scrollBoxRef}
            sidebarRef={sidebarRef}
            timelineRef={timelineRef}
            timelineHeight={timelineHeight}
            handleScroll={handleScroll}
          />
        </Container>
      </EpgScrollContainerProvider>
    </>
  );
};
