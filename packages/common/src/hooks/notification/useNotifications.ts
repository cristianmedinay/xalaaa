/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { HubConnectionState } from "@microsoft/signalr";
import { useEffect, useMemo } from "react";

import { useIsLoggedIn } from "../../hooks/auth";
import { NotificationClient } from "../../services";
import { useDispatch, useSelector } from "../../store";
import { Actions, Selectors } from "../../store/notification";

const connectedStates = [
  HubConnectionState.Connected,
  HubConnectionState.Connecting,
  HubConnectionState.Reconnecting,
];

export const useNotifications = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();
  const hubState = useSelector(Selectors.hubStateSelector);
  const notificationClient = useMemo(
    () => NotificationClient.getInstance(),
    []
  );

  useEffect(() => {
    const callback = (error?: unknown) => {
      if (error) {
        dispatch(Actions.setHubError(error));
      } else {
        dispatch(
          Actions.setHubConnectionState(notificationClient.connection?.state)
        );
      }
    };
    notificationClient.connection?.onclose(callback);
    notificationClient.connection?.onreconnected(callback);
    notificationClient.connection?.onreconnected(callback);
  }, []);

  useEffect(() => {
    if (isLoggedIn && (!hubState || !connectedStates.includes(hubState))) {
      notificationClient
        .start((data) => {
          dispatch(Actions.pushNotification(data));
        })
        .then(() => {
          dispatch(
            Actions.setHubConnectionState(notificationClient.connection?.state)
          );
        })
        .catch((err) => dispatch(Actions.setHubError(err)));
    } else if (!isLoggedIn && hubState && connectedStates.includes(hubState)) {
      notificationClient.close();
    }
  }, [isLoggedIn, hubState]);
};
