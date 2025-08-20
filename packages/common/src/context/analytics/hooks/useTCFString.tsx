/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { TCData } from "@mdnx/tcf-types";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { IAppState } from "store";

import { ANONYMOUS_ID } from "../../../constants";

export const useTCFString = () => {
  const [tcfString, setTcfString] = useState("");

  const userId = useSelector<IAppState, string>(
    (state) => state.auth.user?.Id?.toString() || ANONYMOUS_ID.toString()
  );

  const listenerAddedRef = useRef<boolean>();
  const listenerIdRef = useRef<number | undefined>();

  useEffect(() => {
    if (!window?.__tcfapi) {
      return;
    }
    window.__tcfapi("getTCData", 2, (tcData: TCData, success: boolean) => {
      if (success) {
        setTcfString(tcData.tcString);
      }
    });

    if (!listenerAddedRef.current) {
      const handleUpdateTCFString = (tcData: TCData, success: boolean) => {
        if (success && tcData.eventStatus === "useractioncomplete") {
          listenerIdRef.current = tcData.listenerId;
          setTcfString(tcData.tcString);
        }
      };

      window.__tcfapi("addEventListener", 2, handleUpdateTCFString);
      listenerAddedRef.current = true;
    }

    return () => {
      const wasListenerAdded = typeof listenerIdRef.current === "number";
      if (wasListenerAdded) {
        window.__tcfapi(
          "removeEventListener",
          2,
          () => null,
          listenerIdRef.current
        );
      }
    };
  }, [userId]);

  return {
    tcfString,
  } as const;
};
