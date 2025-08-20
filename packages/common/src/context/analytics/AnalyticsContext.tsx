/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";

import { ANONYMOUS_ID } from "../../constants";
import { IAppState } from "../../store";

import { useHeartBeatInterval, useKonodracEvents } from "./hooks";
import { AnalyticsProviderProps, KonodracEventDispatcher } from "./types";

const AnalyticsContext = createContext<KonodracEventDispatcher>(
  {} as KonodracEventDispatcher
);

export const AnalyticsProvider = (props: AnalyticsProviderProps) => {
  const { system, version, children } = props;

  const userId = useSelector<IAppState, string>(
    (state) => state.auth.user?.Id?.toString() || ANONYMOUS_ID.toString()
  );
  const deviceIdLong = useSelector<IAppState, string>(
    (state) => state.configuration.device?.Name || ""
  );

  const deviceId = deviceIdLong.slice(
    deviceIdLong.indexOf("(") + 1,
    deviceIdLong.lastIndexOf(")")
  );

  const events = useKonodracEvents({
    system,
    deviceId,
    userId,
    version,
  });

  useHeartBeatInterval({
    eventHandler: events.heartbeat,
  });

  return (
    <AnalyticsContext.Provider value={events}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("Component beyond AnalyticsContext");
  }
  return context;
};
