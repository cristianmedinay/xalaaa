/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { useCallback, useEffect, useState } from "react";

import { GuidHelper, TimeHelper } from "../../../helpers";

interface useAnalyticsSessionValue {
  sessionId: string;
  sessionDuration: () => number;
  resetSession: () => void;
}

interface useAnalyticsSessionParams {
  userId: string;
}

export const useAnalyticsSession = (
  props: useAnalyticsSessionParams
): useAnalyticsSessionValue => {
  const [sessionId, setSessionId] = useState<string>(GuidHelper.newGuid());
  const [sessionStartTime, setSessionStartTime] = useState<Date>(
    TimeHelper.getCurrentDateTime()
  );
  const { userId } = props;

  useEffect(() => {
    resetSession();
  }, [userId]);

  const resetSession = useCallback(() => {
    setSessionId(GuidHelper.newGuid());
    setSessionStartTime(TimeHelper.getCurrentDateTime());
  }, []);

  const sessionDuration = useCallback(
    () =>
      TimeHelper.diff(
        TimeHelper.getCurrentDateTime(),
        sessionStartTime,
        "seconds"
      ),
    [sessionStartTime]
  );

  return {
    sessionId,
    sessionDuration,
    resetSession,
  };
};
