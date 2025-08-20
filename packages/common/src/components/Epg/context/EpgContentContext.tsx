/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { createContext, useContext, useMemo } from "react";

import { prepareTimelineChannels, prepareTimelinePrograms } from "../helpers";
import {
  EpgChannel,
  EpgProgram,
  TimelineChannel,
  TimelineProgram,
} from "../types";

import { useEpgConfiguration } from "./EpgConfigurationContext";
import { useEpgDay } from "./EpgDayContext";

interface EpgContentContextValue {
  channels: TimelineChannel[];
  programs: TimelineProgram[];
  numChannels: number;
  isLoading: boolean;
  isEmpty: boolean;
  onLoadDay: (day: Date) => void;
}

export interface EpgContentProviderProps {
  channels: EpgChannel[];
  programs: EpgProgram[];
  isLoading: boolean;
  onLoadDay: (day: Date) => void;
  children: React.ReactNode;
}

const EpgContentContext = createContext<EpgContentContextValue>(
  {} as EpgContentContextValue
);

export const EpgContentProvider = (props: EpgContentProviderProps) => {
  const {
    channels: rawChannels,
    programs: rawPrograms,
    isLoading,
    onLoadDay,
    children,
  } = props;

  const { lineHeight } = useEpgConfiguration();
  const { startDate, endDate, hourWidth } = useEpgDay();

  const numChannels = rawChannels.length;
  const numPrograms = rawPrograms.length;

  const channels = useMemo(
    () =>
      prepareTimelineChannels({ channels: rawChannels, height: lineHeight }),
    [rawChannels, lineHeight]
  );

  const programs = useMemo(() => {
    if (!numChannels && !numPrograms) return [];

    return prepareTimelinePrograms({
      programs: rawPrograms,
      channels: rawChannels,
      startDate,
      endDate,
      lineHeight,
      hourWidth,
    });
  }, [
    numChannels,
    numPrograms,
    endDate,
    hourWidth,
    lineHeight,
    rawChannels,
    startDate,
  ]);

  const isEmpty = useMemo(
    () => !Boolean(programs.length > 0 && channels.length > 0),
    [channels, programs]
  );

  return (
    <EpgContentContext.Provider
      value={{
        channels,
        numChannels,
        programs,
        isLoading,
        isEmpty,
        onLoadDay,
      }}
    >
      {children}
    </EpgContentContext.Provider>
  );
};

export const useEpgContent = () => {
  const context = useContext(EpgContentContext);

  if (!context) {
    throw new Error("Component beyond EpgContentContext");
  }

  return context;
};
