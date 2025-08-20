/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaStreamType } from "../../enums";
import { IMediaModel } from "../../models";

import { Actions } from "./actions";

export type AudioActionTypes =
  | ReturnType<typeof Actions.setAudioSource>
  | ReturnType<typeof Actions.setAudioError>
  | ReturnType<typeof Actions.setAudioMedia>
  | ReturnType<typeof Actions.resetStore>
  | ReturnType<typeof Actions.setIsBottomMenuVisible>;

export interface IAudioState {
  error?: unknown;
  audioSource?: string;
  media?: IMediaModel;
  streamType?: MediaStreamType;
  isBottomMenuVisible?: boolean;
}
