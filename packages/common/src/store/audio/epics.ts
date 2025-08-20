/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import { filter, map } from "rxjs/operators";

import { Consts as AuthActionTypes, Types as AuthTypes } from "../auth";
import {
  Actions as MediaActions,
  Consts as MediaActionTypes,
  Types as MediaTypes,
} from "../media";
import { IAppState } from "../types";

import { Actions as AudioActions } from "./actions";
import { ActionTypes } from "./consts";
import { ISetAudioMediaPayload } from "./models";
import { AudioActionTypes } from "./types";

const getAudioMediaPlayInfoEpic = (
  action$: ActionsObservable<AudioActionTypes>
) =>
  action$.pipe(
    ofType(ActionTypes.SET_AUDIO_MEDIA),
    filter((action: AudioActionTypes) => {
      const payload = action.payload as ISetAudioMediaPayload;
      return !!payload && !!payload.media;
    }),
    map((action: AudioActionTypes) => {
      const payload = action.payload as ISetAudioMediaPayload;
      return MediaActions.getMediaPlayInfo({
        MediaId: payload.media!.Id,
        StreamType: payload.streamType,
      });
    })
  );

const setAudioMediaSourceEpic = (
  action$: ActionsObservable<MediaTypes.IGetMediaPlayInfoSuccessAction>,
  state: StateObservable<IAppState>
) =>
  action$.pipe(
    ofType(MediaActionTypes.GET_MEDIA_PLAY_INFO_SUCCESS),
    filter((action: MediaTypes.IGetMediaPlayInfoSuccessAction) => {
      const media = state.value.audio?.media;
      const mediaPlayInfo = action.payload;
      return !!media && !!mediaPlayInfo;
    }),
    map((action: MediaTypes.IGetMediaPlayInfoSuccessAction) =>
      AudioActions.setAudioSource(action.payload.ContentUrl)
    )
  );

const clearAudioDataAfterLogoutEpic = (
  actions$: ActionsObservable<AuthTypes.ISignOutSuccessAction>
) =>
  actions$.pipe(
    ofType(AuthActionTypes.SIGN_OUT_SUCCESS),
    map(() => AudioActions.resetStore())
  );

export const AudioEpics = [
  getAudioMediaPlayInfoEpic,
  setAudioMediaSourceEpic,
  clearAudioDataAfterLogoutEpic,
];
