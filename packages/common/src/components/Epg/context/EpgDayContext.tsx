/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { createContext, useContext, useMemo, useState } from "react";

import { TimeHelper } from "../../../helpers";
import { calculateDay } from "../helpers";

import { useEpgConfiguration } from "./EpgConfigurationContext";

interface EpgTimeFrame {
  start: number;
  end: number;
}

interface EpgDayContextValue {
  currentDay: Date;
  startDate: Date;
  endDate: Date;
  dayWidth: number;
  hoursInDay: number;
  hourWidth: number;
  startOfDayOffsetHours: number;
  isToday: boolean;
  initialCurrentDay: Date;
  setCurrentDay: (date: Date) => void;
}

export interface EpgDayProviderProps {
  currentDay: Date;
  timeFrame: EpgTimeFrame;
  children: React.ReactNode;
}

const EpgDayContext = createContext<EpgDayContextValue>(
  {} as EpgDayContextValue
);

export const EpgDayProvider = (props: EpgDayProviderProps) => {
  const { timeFrame, currentDay: initialCurrentDay, children } = props;

  const { baseDayWidth } = useEpgConfiguration();

  const [currentDay, setCurrentDay] = useState<Date>(initialCurrentDay);

  const startDate = useMemo(
    (): Date =>
      TimeHelper.createDate(currentDay)
        .hour(timeFrame.start)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toDate(),
    [currentDay, timeFrame.start]
  );

  const endDate = useMemo(
    (): Date =>
      TimeHelper.createDate(currentDay)
        .hour(timeFrame.end)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toDate(),
    [currentDay, timeFrame.end]
  );

  const isToday = useMemo(
    (): boolean => TimeHelper.getCurrentDate().isSame(currentDay, "date"),
    [currentDay]
  );

  const { dayWidth, hoursInDay, hourWidth, startOfDayOffsetHours } = useMemo(
    () => calculateDay({ startDate, endDate, dayWidth: baseDayWidth }),
    [baseDayWidth, endDate, startDate]
  );

  return (
    <EpgDayContext.Provider
      value={{
        startDate,
        endDate,
        dayWidth,
        hoursInDay,
        hourWidth,
        startOfDayOffsetHours,
        isToday,
        initialCurrentDay,
        currentDay,
        setCurrentDay,
      }}
    >
      {children}
    </EpgDayContext.Provider>
  );
};

export const useEpgDay = () => {
  const context = useContext(EpgDayContext);

  if (!context) {
    throw new Error("Component beyond EpgDayContext");
  }

  return context;
};
