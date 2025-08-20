/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAnalyticsMarkerModel, IErrorModel } from "models";

import * as Consts from "./consts";

type RequestStatus = "idle" | "loading" | "success" | "error";

export interface IAnalyticsMarkerState {
  status: RequestStatus;
  action?: AnalyticsMarkerActionsTypes;
  error?: IErrorModel;
}

export interface ISendAnalyticsMarkerAction {
  payload: IAnalyticsMarkerModel;
  type: typeof Consts.SEND_ANALYTICS_MARKER;
}

export interface ISendAnalyticsMarkerSuccessAction {
  type: typeof Consts.SEND_ANALYTICS_MARKER_SUCCESS;
}

export interface ISendAnalyticsMarkerFailureAction {
  type: typeof Consts.SEND_ANALYTICS_MARKER_FAILURE;
  error?: IErrorModel;
}

export type AnalyticsMarkerActionsTypes =
  | ISendAnalyticsMarkerAction
  | ISendAnalyticsMarkerSuccessAction
  | ISendAnalyticsMarkerFailureAction;
