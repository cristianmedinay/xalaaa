/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { createContext, useContext } from "react";

export interface EpgDaySwitcherConfiguration {
  daysBefore: number;
  daysAfter: number;
}

interface EpgConfigurationContextValue {
  daySwitcher?: EpgDaySwitcherConfiguration;
  baseDayWidth: number;
  lineHeight: number;
  verticalTimeScale: number;
  useCompactMode: boolean;
}

export interface EpgConfigurationProviderProps {
  daySwitcher?: EpgDaySwitcherConfiguration;
  baseDayWidth: number;
  lineHeight: number;
  verticalTimeScale?: number;
  useCompactMode?: boolean;
  children: React.ReactNode;
}

const EpgConfigurationContext = createContext<EpgConfigurationContextValue>(
  {} as EpgConfigurationContextValue
);

export const EpgConfigurationProvider = (
  props: EpgConfigurationProviderProps
) => {
  const {
    children,
    verticalTimeScale = 1,
    useCompactMode = false,
    ...configurationProps
  } = props;

  return (
    <EpgConfigurationContext.Provider
      value={{
        ...configurationProps,
        verticalTimeScale,
        useCompactMode,
      }}
    >
      {children}
    </EpgConfigurationContext.Provider>
  );
};

export const useEpgConfiguration = () => {
  const context = useContext(EpgConfigurationContext);

  if (!context) {
    throw new Error("Component beyond EpgConfigurationContext");
  }

  return context;
};
