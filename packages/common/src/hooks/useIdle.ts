/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useRef, useState } from "react";

const EVENT_TYPES = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "touchstart",
  "touchend",
  "scroll",
  "keypress",
  "keydown",
];

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
function throttle(
  func: () => void,
  wait: number,
  options: { leading?: boolean; trailing?: boolean }
) {
  let context: any, args: any, result: any;
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;
  if (!options) options = {};
  const later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function () {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    // @ts-ignore
    context = this;
    // eslint-disable-next-line prefer-rest-params
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

export const useIdle = (duration = 3000) => {
  const [isIdle, setIsIdle] = useState(false);

  const durationRef = useRef<number>(duration);
  if (duration !== durationRef.current) {
    durationRef.current = duration;
  }

  React.useEffect(() => {
    let timeoutHandle: NodeJS.Timeout | null = null;

    const schedule = () => {
      timeoutHandle = setTimeout(() => {
        setIsIdle(true);
      }, durationRef.current);
    };

    const cleanUp = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
    };

    const handleEvent = throttle(
      () => {
        cleanUp();
        setIsIdle(false);
        schedule();
      },
      200,
      { trailing: false }
    );

    EVENT_TYPES.forEach((eventType) => {
      window.addEventListener(eventType, handleEvent);
    });

    cleanUp();
    schedule();
    return () => {
      EVENT_TYPES.forEach((eventType) => {
        window.removeEventListener(eventType, handleEvent);
      });
      cleanUp();
    };
  }, [setIsIdle]);

  return isIdle;
};
