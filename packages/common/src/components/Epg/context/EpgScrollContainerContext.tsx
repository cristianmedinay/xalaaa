/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { debounce } from "lodash";
import React, {
  createContext,
  UIEvent as ReactUIEvent,
  RefObject,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";

import { TimeHelper } from "../../../helpers";
import { getPositionX, isChannelVisible, isProgramVisible } from "../helpers";
import { TimelineProgramPosition, TimelineVerticalPosition } from "../types";

import { useEpgConfiguration } from "./EpgConfigurationContext";
import { useEpgDay } from "./EpgDayContext";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type ScrollEvent = ReactUIEvent<HTMLDivElement, UIEvent> & {
  target: Element;
};

interface EpgScrollContainerDispatchContextValue {
  onScroll: (event: ScrollEvent) => void;
  onScrollRight: (value: number) => void;
  onScrollLeft: (value: number) => void;
  onScrollTop: (value: number) => void;
  onScrollToDate: (date: Date) => void;
  onScrollToNow: () => void;
  onScrollHorizontal: (value: number) => void;
  onProgramFocused: (
    programPosition: TimelineProgramPosition,
    channelPosition: TimelineVerticalPosition
  ) => void;
  onRestoreHorizontalScrollPosition: () => void;
}

interface EpgScrollContainerVisibilityContextValue {
  isProgramVisible: (
    position: TimelineProgramPosition,
    ignoreOverscan?: boolean
  ) => boolean;

  isChannelVisible: (
    position: Pick<TimelineVerticalPosition, "top">,
    ignoreOverscan?: boolean
  ) => boolean;

  isProgramFullyInViewport: (position: TimelineProgramPosition) => boolean;
}

interface EpgScrollContainerProviderProps {
  containerRef: RefObject<HTMLDivElement>;
  scrollBoxRef: RefObject<HTMLDivElement>;
  sidebarRef: RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

const EpgScrollContainerDispatchContext =
  createContext<EpgScrollContainerDispatchContextValue>(
    {} as EpgScrollContainerDispatchContextValue
  );

const EpgScrollContainerVisibilityContext =
  createContext<EpgScrollContainerVisibilityContextValue>(
    {} as EpgScrollContainerVisibilityContextValue
  );

const SCROLL_DEBOUNCE_MS = 100;
const RESIZE_DEBOUNCE_MS = 400;

export const EpgScrollContainerProvider = (
  props: EpgScrollContainerProviderProps
) => {
  const { containerRef, scrollBoxRef, sidebarRef, children } = props;

  const { lineHeight } = useEpgConfiguration();
  const { isToday, startDate, endDate, hourWidth } = useEpgDay();

  const [scrollX, setScrollX] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);

  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const scrollHorizontalRef = useRef<number>(0);
  scrollHorizontalRef.current = scrollX;

  const getSidebarWidth = () => sidebarRef.current?.clientWidth || 0;

  const onScrollDebounced = useMemo(
    () =>
      debounce(
        (x: number, y: number) => {
          unstable_batchedUpdates(() => {
            setScrollX(x);
            setScrollY(y);
          });
        },
        SCROLL_DEBOUNCE_MS,
        { maxWait: SCROLL_DEBOUNCE_MS }
      ),

    []
  );

  const onScroll = useCallback(
    (event: ScrollEvent) => {
      const {
        target: { scrollLeft, scrollTop },
      } = event;

      onScrollDebounced(scrollLeft, scrollTop);
    },
    [onScrollDebounced]
  );

  const onRestoreHorizontalScrollPosition = useCallback(() => {
    if (scrollBoxRef.current) {
      const shouldScrollToNow = isToday && scrollHorizontalRef.current === 0;

      // Scroll to now only when opening today epg for the first time
      shouldScrollToNow
        ? onScrollToNow()
        : (scrollBoxRef.current.scrollLeft = scrollHorizontalRef.current);
    }
  }, [scrollBoxRef]);

  const onScrollToNow = useCallback(() => {
    if (scrollBoxRef?.current && isToday) {
      const clientWidth = containerRef.current?.clientWidth as number;

      const scrollPosition = getPositionX({
        since: TimeHelper.getStartOfToday(),
        till: TimeHelper.getCurrentDateTime(),
        startDate,
        endDate,
        hourWidth,
      });

      scrollBoxRef.current.scrollLeft =
        scrollPosition - clientWidth / 2 + getSidebarWidth() * 0.5;
    }
  }, [scrollBoxRef, isToday, containerRef, startDate, endDate, hourWidth]);

  const onScrollToDate = useCallback(
    (date: Date) => {
      if (scrollBoxRef?.current) {
        const clientWidth = containerRef.current?.clientWidth as number;

        const scrollPosition = getPositionX({
          since: startDate,
          till: TimeHelper.replaceTime(startDate, date),
          startDate,
          endDate,
          hourWidth,
        });

        scrollBoxRef.current.scrollLeft =
          scrollPosition - clientWidth / 2 + getSidebarWidth() * 0.5;
      }
    },
    [containerRef, endDate, hourWidth, scrollBoxRef, startDate]
  );

  const onScrollRight = useCallback(
    (value: number = hourWidth) => {
      if (scrollBoxRef?.current) {
        scrollBoxRef.current.scrollLeft =
          scrollBoxRef.current.scrollLeft + value;
      }
    },
    [hourWidth, scrollBoxRef]
  );

  const onScrollLeft = useCallback(
    (value: number = hourWidth) => {
      if (scrollBoxRef?.current) {
        scrollBoxRef.current.scrollLeft =
          scrollBoxRef.current.scrollLeft - value;
      }
    },
    [hourWidth, scrollBoxRef]
  );

  const onScrollHorizontal = useCallback(
    (value: number) => {
      if (scrollBoxRef?.current) {
        scrollBoxRef.current.scrollLeft = value;
      }
    },
    [scrollBoxRef]
  );

  const onScrollTop = useCallback(
    (value: number = hourWidth) => {
      if (scrollBoxRef?.current) {
        scrollBoxRef.current.scrollTop = value;
      }
    },
    [hourWidth, scrollBoxRef]
  );

  const onResize = useCallback(() => {
    debounce(() => {
      if (containerRef?.current) {
        const { clientWidth } = containerRef.current;

        setContainerWidth(clientWidth);
      }
    }, RESIZE_DEBOUNCE_MS);
  }, [containerRef]);

  const isProgramFullyInViewport = useCallback(
    (position: TimelineProgramPosition) => {
      const viewportStart = scrollX;
      const viewportEnd = scrollX + containerWidth - getSidebarWidth();

      return viewportStart <= position.left && viewportEnd >= position.edgeEnd;
    },
    [containerWidth, scrollX]
  );

  const isProgramVisibleCallback = useCallback(
    (position: TimelineProgramPosition, ignoreOverscan?: boolean): boolean =>
      isProgramVisible({
        position,
        scrollX,
        scrollY,
        containerHeight,
        containerWidth,
        itemOverscan: ignoreOverscan ? 0 : lineHeight,
      }),
    [containerHeight, containerWidth, lineHeight, scrollX, scrollY]
  );

  const isChannelVisibleCallback = useCallback(
    (
      position: Pick<TimelineVerticalPosition, "top">,
      ignoreOverscan?: boolean
    ): boolean =>
      isChannelVisible({
        position,
        scrollY,
        containerHeight: containerHeight - 90,
        itemOverscan: ignoreOverscan ? 0 : lineHeight,
      }),
    [containerHeight, lineHeight, scrollY]
  );

  const onProgramFocused = useCallback(
    (
      programPosition: TimelineProgramPosition,
      channelPosition: TimelineVerticalPosition
    ) => {
      // scroll to program start date (left/right navigation)
      if (!isProgramFullyInViewport(programPosition)) {
        onScrollHorizontal(programPosition.left);
      }

      // scroll to channel if not visible (top/button navigation)
      if (!isChannelVisibleCallback(channelPosition, true)) {
        const { top, height } = channelPosition;
        const scale = Math.trunc(containerHeight / height);

        // scroll down and up by one position row
        onScrollTop(scrollY > top ? top : top - height * (scale - 1));
      }
    },
    [
      containerHeight,
      isChannelVisibleCallback,
      isProgramFullyInViewport,
      onScrollHorizontal,
      onScrollTop,
      scrollY,
    ]
  );

  const { clientWidth = 0, clientHeight = 0 } = containerRef.current || {};

  // initial width and height
  useLayoutEffect(() => {
    if (containerRef?.current) {
      const { clientWidth, clientHeight } = containerRef.current;

      unstable_batchedUpdates(() => {
        setContainerWidth(clientWidth);
        setContainerHeight(clientHeight);
      });
    }
  }, [clientWidth, clientHeight]);

  // resize event
  useLayoutEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  const dispatchValues = useMemo(
    () => ({
      onScroll,
      onScrollToDate,
      onScrollLeft,
      onScrollRight,
      onScrollTop,
      onScrollToNow,
      onScrollHorizontal,
      onProgramFocused,
      onRestoreHorizontalScrollPosition,
    }),
    [
      onScroll,
      onScrollHorizontal,
      onScrollLeft,
      onScrollRight,
      onScrollToDate,
      onScrollToNow,
      onScrollTop,
      onProgramFocused,
      onRestoreHorizontalScrollPosition,
    ]
  );

  const visibilityValues = useMemo(
    () => ({
      isChannelVisible: isChannelVisibleCallback,
      isProgramVisible: isProgramVisibleCallback,
      isProgramFullyInViewport,
    }),
    [
      isChannelVisibleCallback,
      isProgramFullyInViewport,
      isProgramVisibleCallback,
    ]
  );

  return (
    <EpgScrollContainerDispatchContext.Provider value={dispatchValues}>
      <EpgScrollContainerVisibilityContext.Provider value={visibilityValues}>
        {children}
      </EpgScrollContainerVisibilityContext.Provider>
    </EpgScrollContainerDispatchContext.Provider>
  );
};

export const useEpgScrollContainerDispatch = () => {
  const context = useContext(EpgScrollContainerDispatchContext);

  if (!context) {
    throw new Error("Component beyond EpgScrollContainerDispatchContext");
  }

  return context;
};

export const useEpgScrollContainerVisibility = () => {
  const context = useContext(EpgScrollContainerVisibilityContext);

  if (!context) {
    throw new Error("Component beyond EpgScrollContainerVisibilityContext");
  }

  return context;
};
