/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEffect, useRef } from "react";

export const useTimeWindowAggregator = <T>(
  effect: (aggregated: T[]) => void,
  delay: number
) => {
  const effectRef = useRef<typeof effect>();

  if (!effectRef.current) {
    effectRef.current = effect;
  }

  const aggregatedRef = useRef<T[]>([]);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const push = (item: T) => {
    aggregatedRef.current = [...aggregatedRef.current, item];
    if (aggregatedRef.current.length === 1) {
      timeoutRef.current = setTimeout(() => {
        effectRef.current?.(aggregatedRef.current);
        aggregatedRef.current = [];
        timeoutRef.current = undefined;
      }, delay);
    }
  };

  useEffect(
    () => () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    },
    []
  );

  return push;
};
