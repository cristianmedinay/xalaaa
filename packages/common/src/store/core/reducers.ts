/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as Consts from "./consts";
import { CoreActionsTypes, ICoreState } from "./types";

export const initialState: ICoreState = {
  isAppInitialized: false,
  initializing: false,
  isUserDataPreloaded: false,
};

export const coreReducer = (
  state = initialState,
  action: CoreActionsTypes
): ICoreState => {
  state.action = action;

  switch (action.type) {
    case Consts.APP_START_INITIALIZATION: {
      return {
        ...state,
        isAppInitialized: false,
        initializing: true,
      };
    }
    case Consts.APP_FINISH_INITIALIZATION: {
      return {
        ...state,
        isAppInitialized: true,
        initializing: false,
      };
    }
    case Consts.APP_FINISH_USER_DATA_PRELOAD: {
      return {
        ...state,
        isUserDataPreloaded: true,
      };
    }
    case Consts.SET_APP_GLOBAL_ERROR: {
      return {
        ...state,
        globalError: action.payload,
      };
    }
    default:
      return state;
  }
};
