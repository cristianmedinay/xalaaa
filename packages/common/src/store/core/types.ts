/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IExceptionModel } from "../../models";

import * as Consts from "./consts";

export interface ICoreState {
  action?: CoreActionsTypes;
  globalError?: IExceptionModel;
  isAppInitialized: boolean;
  initializing: boolean;
  isUserDataPreloaded: boolean;
}

export interface IAppStartInitializationAction {
  type: typeof Consts.APP_START_INITIALIZATION;
}

export interface IAppFinishInitializationAction {
  type: typeof Consts.APP_FINISH_INITIALIZATION;
}

export interface ISetAppGlobalErrorAction {
  type: typeof Consts.SET_APP_GLOBAL_ERROR;
  payload?: IExceptionModel;
}

export interface IAppFinishUserDataPreload {
  type: typeof Consts.APP_FINISH_USER_DATA_PRELOAD;
}

export type CoreActionsTypes =
  | IAppStartInitializationAction
  | IAppFinishInitializationAction
  | ISetAppGlobalErrorAction
  | IAppFinishUserDataPreload;
