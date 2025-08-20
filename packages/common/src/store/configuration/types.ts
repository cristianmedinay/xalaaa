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

export interface IConfigurationState {
  action?: ConfigurationActionsTypes;
  configuration?: IConfigurationModel;
  device?: IUserDeviceModel;
  error?: IErrorModel;
  isLoading?: boolean;
}

export interface IGetConfigurationAction {
  type: typeof Consts.GET_CONFIGURATION;
  platformCode?: PlatformType;
  isNewConfigAvailable?: boolean;
}

export interface IGetConfigurationSuccessAction {
  type: typeof Consts.GET_CONFIGURATION_SUCCESS;
  payload: IConfigurationModel;
  device: IUserDeviceModel;
}

export interface IGetConfigurationFailureAction {
  type: typeof Consts.GET_CONFIGURATION_FAILURE;
  error?: IErrorModel;
}
export interface IGetConfigurationOfflineAction {
  type: typeof Consts.GET_CONFIGURATION_OFFLINE;
  platformCode?: PlatformType;
}

export interface IGetConfigurationOfflineSuccessAction {
  type: typeof Consts.GET_CONFIGURATION_OFFLINE_SUCCESS;
  payload: IConfigurationModel;
  device: IUserDeviceModel;
}

export interface IGetConfigurationOfflineFailureAction {
  type: typeof Consts.GET_CONFIGURATION_OFFLINE_FAILURE;
  error?: IErrorModel;
}

export type ConfigurationActionsTypes =
  | IGetConfigurationAction
  | IGetConfigurationSuccessAction
  | IGetConfigurationFailureAction
  | IGetConfigurationOfflineAction
  | IGetConfigurationOfflineSuccessAction
  | IGetConfigurationOfflineFailureAction;
