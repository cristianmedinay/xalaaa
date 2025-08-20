/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAnalyticsMarkerModel, IErrorModel } from "models";

import * as Consts from "./consts";
import * as Types from "./types";

export const sendAnalyticsMarker = (
  payload: IAnalyticsMarkerModel
): Types.ISendAnalyticsMarkerAction => ({
  payload,
  type: Consts.SEND_ANALYTICS_MARKER,
});

export const sendAnalyticsMarkerSuccess =
  (): Types.ISendAnalyticsMarkerSuccessAction => ({
    type: Consts.SEND_ANALYTICS_MARKER_SUCCESS,
  });

export const sendAnalyticsMarkerFailure = (
  error?: IErrorModel
): Types.ISendAnalyticsMarkerFailureAction => ({
  error,
  type: Consts.SEND_ANALYTICS_MARKER_FAILURE,
});

export const Actions = {
  sendAnalyticsMarker,
  sendAnalyticsMarkerFailure,
  sendAnalyticsMarkerSuccess,
};
