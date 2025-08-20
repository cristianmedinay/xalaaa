/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { useCallback, useEffect, useRef } from "react";

import { TimeHelper } from "../../../helpers";

interface useHeartBeatIntervalParams {
  eventHandler: () => boolean;
}

export const useHeartBeatInterval = (params: useHeartBeatIntervalParams) => {
  const { eventHandler } = params;

  const handlerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const createTime = useRef<number | undefined>(undefined);
  const resetTime = useRef<number | undefined>(undefined);

  const createTimer = useCallback(() => {
    if (!createTime.current) {
      createTime.current = TimeHelper.getCurrentDateTime().getTime();
    }

    const time =
      resetTime.current && createTime.current
        ? 50000 -
          TimeHelper.diff(resetTime.current, createTime.current, "milliseconds")
        : 50000;

    resetTime.current = undefined;

    handlerRef.current = setTimeout(() => {
      eventHandler();
      createTime.current = undefined;
      createTimer();
    }, time);
  }, [eventHandler]);

  useEffect(() => {
    createTimer();

    return () => {
      if (handlerRef.current) {
        resetTime.current = TimeHelper.getCurrentDateTime().getTime();
        clearTimeout(handlerRef.current);
      }
    };
  }, [createTimer]);
};
