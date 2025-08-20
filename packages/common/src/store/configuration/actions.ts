/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { PlatformType } from "../../enums";
import {
  IConfigurationModel,
  IErrorModel,
  IUserDeviceModel,
} from "../../models";

import * as Consts from "./consts";
import {
  IGetConfigurationAction,
  IGetConfigurationFailureAction,
  IGetConfigurationOfflineAction,
  IGetConfigurationOfflineFailureAction,
  IGetConfigurationOfflineSuccessAction,
  IGetConfigurationSuccessAction,
} from "./types";

export const getConfiguration = (
  platformCode?: PlatformType,
  isNewConfigAvailable?: boolean
): IGetConfigurationAction => {
  return {
    platformCode,
    isNewConfigAvailable,
    type: Consts.GET_CONFIGURATION,
  };
};

export const getConfigurationSuccess = (
  configuration: IConfigurationModel,
  device: IUserDeviceModel
): IGetConfigurationSuccessAction => {
  return {
    payload: configuration,
    type: Consts.GET_CONFIGURATION_SUCCESS,
    device,
  };
};

export const getConfigurationFailure = (
  error?: IErrorModel
): IGetConfigurationFailureAction => {
  return {
    error,
    type: Consts.GET_CONFIGURATION_FAILURE,
  };
};

export const getConfigurationOffline = (
  platformCode?: PlatformType
): IGetConfigurationOfflineAction => {
  return {
    platformCode,
    type: Consts.GET_CONFIGURATION_OFFLINE,
  };
};

export const getConfigurationOfflineSuccess = (
  configuration: IConfigurationModel,
  device: IUserDeviceModel
): IGetConfigurationOfflineSuccessAction => {
  return {
    payload: configuration,
    type: Consts.GET_CONFIGURATION_OFFLINE_SUCCESS,
    device,
  };
};

export const getConfigurationOfflineFailure = (
  error?: IErrorModel
): IGetConfigurationOfflineFailureAction => {
  return {
    error,
    type: Consts.GET_CONFIGURATION_OFFLINE_FAILURE,
  };
};

export const Actions = {
  getConfiguration,
  getConfigurationOffline,
};
