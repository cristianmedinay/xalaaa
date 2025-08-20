/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useEffect, useRef } from "react";

export const useInterval = (
  callback: () => void,
  delay: number | null,
  enable?: boolean
) => {
  const savedCallback = useRef(callback);
  let timer: NodeJS.Timer;

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback, enable]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.

    if (delay === null) {
      return;
    }
    timer && clearInterval(timer);
    savedCallback.current();
    timer = setInterval(() => enable && savedCallback.current(), delay);

    return () => clearInterval(timer);
  }, [delay, enable]);
};
