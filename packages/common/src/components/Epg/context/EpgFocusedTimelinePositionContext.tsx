/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { createContext, useContext, useState } from "react";

import { TimelineProgramPosition } from "../types";

interface EpgFocusedTimelinePositionContextValue {
  focusedTimelinePosition: TimelineProgramPosition | undefined;
}

interface EpgFocusedTimelinePositionDispatchContextValue {
  setFocusedTimelinePosition: (position: TimelineProgramPosition) => void;
}

interface EpgFocusedTimelinePositionProviderProps {
  children: React.ReactNode;
}

const EpgFocusedTimelinePositionContext =
  createContext<EpgFocusedTimelinePositionContextValue>(
    {} as EpgFocusedTimelinePositionContextValue
  );

const EpgFocusedTimelinePositionDispatchContext =
  createContext<EpgFocusedTimelinePositionDispatchContextValue>(
    {} as EpgFocusedTimelinePositionDispatchContextValue
  );

export const EpgFocusedTimelinePositionProvider = (
  props: EpgFocusedTimelinePositionProviderProps
) => {
  const { children } = props;

  const [focusedTimelinePosition, setFocusedTimelinePosition] = useState<
    TimelineProgramPosition | undefined
  >(undefined);

  return (
    <EpgFocusedTimelinePositionContext.Provider
      value={{ focusedTimelinePosition }}
    >
      <EpgFocusedTimelinePositionDispatchContext.Provider
        value={{ setFocusedTimelinePosition }}
      >
        {children}
      </EpgFocusedTimelinePositionDispatchContext.Provider>
    </EpgFocusedTimelinePositionContext.Provider>
  );
};

export const useEpgFocusedTimelinePosition = () => {
  const context = useContext(EpgFocusedTimelinePositionContext);

  if (!context) {
    throw new Error("Component beyond EpgFocusedTimelinePositionContext");
  }

  return context;
};

export const useEpgFocusedTimelinePositionDispatch = () => {
  const context = useContext(EpgFocusedTimelinePositionDispatchContext);

  if (!context) {
    throw new Error(
      "Component beyond EpgFocusedTimelinePositionDispatchContext"
    );
  }

  return context;
};
