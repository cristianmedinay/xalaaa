/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IConfigurationModel } from "../../models";
import { StorageManager } from "../../services";

import * as Consts from "./consts";
import { ConfigurationActionsTypes, IConfigurationState } from "./types";

export const initialState: IConfigurationState = {
  isLoading: false,
};

export const configurationReducer = (
  state = initialState,
  action: ConfigurationActionsTypes
): IConfigurationState => {
  switch (action.type) {
    case Consts.GET_CONFIGURATION_OFFLINE:
    case Consts.GET_CONFIGURATION: {
      return {
        ...state,
        action: action,
        isLoading: true,
        error: undefined,
      };
    }
    case Consts.GET_CONFIGURATION_OFFLINE_SUCCESS:
    case Consts.GET_CONFIGURATION_SUCCESS: {
      let configuration: IConfigurationModel = {};

      if (action.payload) {
        configuration = { ...action.payload };
      }

      if (configuration.Sources) {
        delete configuration.Sources;
      }

      StorageManager.setValue("configuration", configuration);

      return {
        ...state,
        action: action,
        configuration,
        device: action.device,
        isLoading: false,
      };
    }
    case Consts.GET_CONFIGURATION_OFFLINE_FAILURE:
    case Consts.GET_CONFIGURATION_FAILURE: {
      return {
        ...state,
        action: action,
        isLoading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
