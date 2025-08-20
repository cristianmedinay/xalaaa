/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import { switchMap } from "rxjs/operators";

import { IErrorModel } from "models";

import { DataProvider } from "../../providers/DataProvider";
import { IAppState } from "../types";

import * as Actions from "./actions";
import * as Consts from "./consts";
import * as Types from "./types";

const sendAnalyticsMarkerEpic = (
  action$: ActionsObservable<Types.ISendAnalyticsMarkerAction>,
  _state: StateObservable<IAppState>
) =>
  action$.pipe(
    ofType(Consts.SEND_ANALYTICS_MARKER),
    switchMap(async (action) => {
      try {
        await DataProvider.sendAnalyticsMarker(action.payload);
        return Actions.sendAnalyticsMarkerSuccess();
      } catch (error) {
        console.log("analytics error: ", error);
        return Actions.sendAnalyticsMarkerFailure(error as IErrorModel);
      }
    })
  );

export const analyticsEpics = [sendAnalyticsMarkerEpic];
