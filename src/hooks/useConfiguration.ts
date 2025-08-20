/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef } from "react";

export const useConfiguration = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initializeTask = (task: () => void): void => {
    const scheduleNextTask = (startTime: Dayjs): void => {
      const delay = startTime.diff(dayjs());

      timerRef.current = setTimeout(() => {
        task();

        const nextTime = startTime.add(30, "minute");
        scheduleNextTask(nextTime);
      }, delay);
    };

    const now = dayjs();
    let nextTime: dayjs.Dayjs = now.startOf("minute");

    if (now.minute() < 30) {
      nextTime = nextTime.minute(30).second(0);
    } else {
      nextTime = nextTime.add(1, "hour").minute(0).second(0);
    }

    scheduleNextTask(nextTime);
  };

  const clearTask = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { initializeTask, clearTask };
};
