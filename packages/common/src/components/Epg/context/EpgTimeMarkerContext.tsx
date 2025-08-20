/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { TimeHelper } from "../../../helpers";
import { useInterval } from "../../../hooks";
import { getPositionX } from "../helpers";

import { useEpgConfiguration } from "./EpgConfigurationContext";
import { useEpgContent } from "./EpgContentContext";
import { useEpgDay } from "./EpgDayContext";

interface EpgTimeMarkerContextValue {
  isVisible: boolean;
  height: number;
  position: number;
}

interface EpgTimeMarkerProviderProps {
  children: React.ReactNode;
}

const EpgTimeMarkerContext = createContext<EpgTimeMarkerContextValue>(
  {} as EpgTimeMarkerContextValue
);

const PROGRAM_REFRESH = 120000;

export const EpgTimeMarkerProvider = (props: EpgTimeMarkerProviderProps) => {
  const { children } = props;

  const { lineHeight } = useEpgConfiguration();
  const { startDate, endDate, dayWidth, hourWidth } = useEpgDay();
  const { numChannels } = useEpgContent();

  const height = useMemo(
    () => numChannels * lineHeight,
    [lineHeight, numChannels]
  );

  const calculatePosition = useCallback(
    () =>
      getPositionX({
        since: TimeHelper.getStartOfDay(startDate),
        till: TimeHelper.getCurrentDateTime(),
        startDate,
        endDate,
        hourWidth,
      }),
    [endDate, hourWidth, startDate]
  );

  const [positionX, setPositionX] = useState<number>(() => calculatePosition());

  const isDayEnd = positionX <= dayWidth;
  const isToday = TimeHelper.getCurrentDate().isSame(startDate, "date");
  const isFuture = TimeHelper.isAfterCurrent(endDate);

  const isScrollX = useMemo(
    () => (isDayEnd ? PROGRAM_REFRESH : null),
    [isDayEnd]
  );

  useInterval(() => {
    const positionOffset = (hourWidth / 60) * 2;
    setPositionX((prev) => prev + positionOffset);
  }, isScrollX);

  useEffect(() => {
    setPositionX(calculatePosition());
  }, [calculatePosition, endDate, hourWidth, startDate]);

  return (
    <EpgTimeMarkerContext.Provider
      value={{
        isVisible: isToday || isFuture,
        height,
        position: positionX,
      }}
    >
      {children}
    </EpgTimeMarkerContext.Provider>
  );
};

export const useEpgTimeMarker = () => {
  const context = useContext(EpgTimeMarkerContext);

  if (!context) {
    throw new Error("Component beyond EpgTimeMarkerContext");
  }

  return context;
};
