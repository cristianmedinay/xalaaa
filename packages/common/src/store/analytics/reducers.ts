/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as Consts from "./consts";
import * as Types from "./types";

export const initialState: Types.IAnalyticsMarkerState = {
  status: "idle",
};

export const analyticsReducer = (
  state = initialState,
  action: Types.AnalyticsMarkerActionsTypes
): Types.IAnalyticsMarkerState => {
  switch (action.type) {
    case Consts.SEND_ANALYTICS_MARKER: {
      return {
        action,
        status: "loading",
        error: undefined,
      };
    }
    case Consts.SEND_ANALYTICS_MARKER_SUCCESS: {
      return {
        action,
        status: "success",
        error: undefined,
      };
    }
    case Consts.SEND_ANALYTICS_MARKER_FAILURE: {
      return {
        action,
        status: "error",
        error: action.error,
      };
    }
    default:
      return state;
  }
};
