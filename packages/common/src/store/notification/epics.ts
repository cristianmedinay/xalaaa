/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionsObservable, ofType } from "redux-observable";
import { switchMap } from "rxjs/operators";

import { DataProvider } from "../../providers/DataProvider";

import * as Consts from "./consts";
import * as Types from "./types";

export const confirmReadEpic = (
  action$: ActionsObservable<Types.IConfirmReadAction>
) =>
  action$.pipe(
    ofType(Consts.CONFIRM_READ),
    switchMap(async (action: Types.IConfirmReadAction) => {
      try {
        const guid = action.guid;
        const response = await DataProvider.confirmRead(guid);
        console.debug("confirmReadEpic:", response);
      } catch (error) {
        console.error("confirmReadEpic Error:", error);
      }
    })
  );

export const notificationEpics = [confirmReadEpic];
