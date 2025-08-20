/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { createReducers, IPayloadAction } from "../utils";

import { ActionTypes } from "./consts";
import { ISetAudioMediaPayload } from "./models";
import { AudioActionTypes, IAudioState } from "./types";

const initialState: IAudioState = {};

export const audioReducers = createReducers<
  IAudioState,
  unknown,
  AudioActionTypes
>(initialState, {
  [ActionTypes.SET_AUDIO_SOURCE]: (
    state,
    action: IPayloadAction<unknown>
  ) =>
    ({
      ...state,
      audioSource: action.payload as string | undefined,
    } as IAudioState),
  [ActionTypes.SET_AUDIO_ERROR]: (state, action: IPayloadAction<unknown>) => ({
    ...state,
    error: action.error,
  }),
  [ActionTypes.SET_AUDIO_MEDIA]: (
    state,
    action: IPayloadAction<unknown>
  ) =>
    ({
      ...state,
      media: (action.payload as ISetAudioMediaPayload)?.media,
      streamType: (action.payload as ISetAudioMediaPayload)?.streamType,
    } as IAudioState),
  [ActionTypes.RESET_AUDIO_STORE]: () => ({}),
  [ActionTypes.SET_IS_BOTTOM_MENU_VISIBLE]: (
    state,
    action: IPayloadAction<unknown>
  ) => ({ ...state, isBottomMenuVisible: action.payload as boolean }),
});
