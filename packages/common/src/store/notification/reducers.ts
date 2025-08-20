/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { HubConnectionState } from "@microsoft/signalr";

import { INotification } from "../../models";
import { createReducers } from "../utils";

import { ActionTypes } from "./consts";
import { INotificationState } from "./INotificationState";
import { NotificationActionTypes } from "./types";

export const initialState: INotificationState = {
  notifications: [],
};

export const notificationReducers = createReducers(initialState, {
  [ActionTypes.PUSH_NOTIFICATION]: (
    state,
    action: NotificationActionTypes
  ) => ({
    ...state,
    notifications: Array.from(
      new Set([...state.notifications, action.payload as INotification])
    ),
  }),
  [ActionTypes.SET_HUB_CONNECTION_STATE]: (
    state,
    action: NotificationActionTypes
  ) => ({ ...state, connectionState: action.payload as HubConnectionState }),
  [ActionTypes.SET_HUB_ERROR]: (state, action: NotificationActionTypes) => ({
    ...state,
    error: action.payload,
  }),
  [ActionTypes.CONFIRM_READ]: (state) => ({
    ...state,
  }),
});
