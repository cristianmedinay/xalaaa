/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { createContext, useCallback, useContext, useState } from "react";

import { ChannelId } from "../types";

interface EpgActiveChannelContextValue {
  channelId: ChannelId | undefined;
  setActive: (channelId: ChannelId) => void;
  clear: () => void;
}

interface EpgActiveChannelProviderProps {
  children: React.ReactNode;
}

const EpgActiveChannelContext = createContext<EpgActiveChannelContextValue>(
  {} as EpgActiveChannelContextValue
);

export const EpgActiveChannelProvider = (
  props: EpgActiveChannelProviderProps
) => {
  const { children } = props;

  const [channelId, setChannelId] = useState<ChannelId | undefined>(undefined);

  const setActive = useCallback((value: ChannelId) => setChannelId(value), []);
  const clear = useCallback(() => setChannelId(undefined), []);

  return (
    <EpgActiveChannelContext.Provider value={{ channelId, setActive, clear }}>
      {children}
    </EpgActiveChannelContext.Provider>
  );
};

export const useEpgActiveChannel = () => {
  const context = useContext(EpgActiveChannelContext);

  if (!context) {
    throw new Error("Component beyond EpgActiveChannelContext");
  }

  return context;
};
