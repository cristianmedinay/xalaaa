/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { createPayloadAction } from "../utils";

import { ActionTypes } from "./consts";
import { ISetAudioMediaPayload } from "./models";

const setAudioSource = createPayloadAction<string | undefined>(
  ActionTypes.SET_AUDIO_SOURCE
);

const setAudioError = createPayloadAction<unknown>(ActionTypes.SET_AUDIO_ERROR);

const setAudioMedia = createPayloadAction<ISetAudioMediaPayload | undefined>(
  ActionTypes.SET_AUDIO_MEDIA
);

const resetStore = createPayloadAction<void>(ActionTypes.RESET_AUDIO_STORE);

const setIsBottomMenuVisible = createPayloadAction<boolean>(
  ActionTypes.SET_IS_BOTTOM_MENU_VISIBLE
);

export const Actions = {
  setAudioSource,
  setAudioError,
  setAudioMedia,
  resetStore,
  setIsBottomMenuVisible,
};
