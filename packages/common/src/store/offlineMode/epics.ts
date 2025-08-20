/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { ActionsObservable, ofType } from "redux-observable";
import { switchMap } from "rxjs/operators";

import { StorageManager } from "../../services/StorageManager";

import { Actions } from "./actions";
import { ActionTypes } from "./consts";
import { OfflineModeActionTypes } from "./types";

const getDownloadedPodcasts = (
  action$: ActionsObservable<OfflineModeActionTypes>
) =>
  action$.pipe(
    ofType(ActionTypes.GET_DOWNLOADED_PODCASTS),
    switchMap(async () => {
      try {
        const downloaded = await StorageManager.getValue("podcasts");
        return Actions.getDownloadedPodcastsSuccess(downloaded);
      } catch (e) {
        return Actions.getDownloadedPodcastsFailure();
      }
    })
  );

export const OfflineModeEpics = [getDownloadedPodcasts];
