/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel } from "../../models";

import { Actions } from "./actions";
import * as Consts from "./consts";

export interface IConfirmReadAction {
  type: typeof Consts.CONFIRM_READ;
  guid: string;
  payload?: unknown;
}

export interface IConfirmReadSuccessAction {
  type: typeof Consts.CONFIRM_READ_SUCCESS;
  payload?: unknown;
}

export interface IConfirmReadFailureAction {
  type: typeof Consts.CONFIRM_READ_FAILURE;
  error?: IErrorModel;
  payload?: unknown;
}

export type NotificationActionTypes =
  | ReturnType<typeof Actions.pushNotification>
  | ReturnType<typeof Actions.setHubConnectionState>
  | ReturnType<typeof Actions.setHubError>
  | IConfirmReadAction
  | IConfirmReadSuccessAction
  | IConfirmReadFailureAction;
