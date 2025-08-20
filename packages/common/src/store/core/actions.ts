/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IExceptionModel } from "../../models";

import * as Consts from "./consts";
import {
  IAppFinishInitializationAction,
  IAppFinishUserDataPreload,
  IAppStartInitializationAction,
  ISetAppGlobalErrorAction,
} from "./types";

export const startAppInitialization = (): IAppStartInitializationAction => {
  return {
    type: Consts.APP_START_INITIALIZATION,
  };
};

export const finishAppInitialization = (): IAppFinishInitializationAction => {
  return {
    type: Consts.APP_FINISH_INITIALIZATION,
  };
};

export const finishAppUserDataPreload = (): IAppFinishUserDataPreload => {
  return {
    type: Consts.APP_FINISH_USER_DATA_PRELOAD,
  };
};

export const setAppGlobalError = (
  error?: IExceptionModel
): ISetAppGlobalErrorAction => {
  return {
    type: Consts.SET_APP_GLOBAL_ERROR,
    payload: error,
  };
};

export const Actions = {
  startAppInitialization,
  finishAppInitialization,
  setAppGlobalError,
  finishAppUserDataPreload,
};
