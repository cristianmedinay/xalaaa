/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";

import { TimeHelper } from "../../../helpers";

interface useAppPathWatcherValue {
  count: number;
  lastPath: string | undefined;
  getCurrentPathTimeSeconds: () => number;
}

export const useAppPathWatcher = (): useAppPathWatcherValue => {
  const { location } = useHistory();
  const isInitialRoute = location.pathname === "/";

  const [paths, setPaths] = useState<string[]>(
    isInitialRoute ? [] : [location.pathname]
  );
  const [pathTime, setPathTime] = useState<Date>(
    TimeHelper.getCurrentDateTime()
  );

  const count = useMemo(() => new Set(paths).size, [paths]);
  const lastPath = useMemo(() => paths[paths.length - 1], [paths]);

  const getCurrentPathTimeSeconds = (): number =>
    TimeHelper.diff(TimeHelper.getCurrentDateTime(), pathTime, "seconds");

  useEffect(() => {
    const newPath = location.pathname;
    const isSamePath = newPath === lastPath;

    if (newPath !== "/" && !isSamePath) {
      setPaths((prev) => [...prev, newPath]);
    }

    // reset time when path change
    setPathTime(TimeHelper.getCurrentDateTime());
  }, [location.pathname, lastPath]);

  return {
    count,
    lastPath,
    getCurrentPathTimeSeconds,
  };
};
