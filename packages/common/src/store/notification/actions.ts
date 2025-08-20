/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { HubConnectionState } from "@microsoft/signalr";

import { INotification } from "../../models";
import { createPayloadAction } from "../utils";

import * as Consts from "./consts";
import { ActionTypes } from "./consts";
import { IConfirmReadAction } from "./types";

const pushNotification = createPayloadAction<INotification>(
  ActionTypes.PUSH_NOTIFICATION
);

const setHubConnectionState = createPayloadAction<
  HubConnectionState | undefined
>(ActionTypes.SET_HUB_CONNECTION_STATE);

const setHubError = createPayloadAction<unknown>(ActionTypes.SET_HUB_ERROR);

export const confirmRead = (guid: string): IConfirmReadAction => {
  return {
    guid,
    type: Consts.CONFIRM_READ,
  };
};

export const Actions = {
  pushNotification,
  setHubConnectionState,
  setHubError,
  confirmRead,
};
