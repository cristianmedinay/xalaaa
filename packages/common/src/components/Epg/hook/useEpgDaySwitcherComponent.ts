/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useCallback, useMemo } from "react";

import {
  EpgDaySwitcherConfiguration,
  useEpgConfiguration,
  useEpgContent,
  useEpgDay,
} from "../context";
import { generateDates } from "../helpers";

export const useEpgDaySwitcherComponent = (
  daySwitcherProps?: EpgDaySwitcherConfiguration,
  initialCurrentDayProp?: Date
) => {
  const { daySwitcher: daySwitcherConfiguration } = useEpgConfiguration();
  const { currentDay, initialCurrentDay, setCurrentDay } = useEpgDay();
  const { onLoadDay } = useEpgContent();

  const { daysBefore = 0, daysAfter = 0 } =
    daySwitcherConfiguration || daySwitcherProps || {};

  const onDaySelect = useCallback(
    (day: Date) => {
      setCurrentDay(day);
      onLoadDay(day);
    },
    [onLoadDay, setCurrentDay]
  );

  const dates = useMemo(() => {
    const origin = initialCurrentDay || initialCurrentDayProp;

    const beforeDates = generateDates({
      count: daysBefore,
      origin,
      backward: true,
    }).reverse();

    const afterDates = generateDates({
      count: daysAfter,
      origin,
    });

    return [...beforeDates, origin, ...afterDates];
  }, [daysBefore, daysAfter, initialCurrentDay]);

  return {
    onDaySelect,
    dates,
    currentDay,
    initialCurrentDay,
  };
};
