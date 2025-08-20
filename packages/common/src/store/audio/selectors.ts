/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "../types";

const audioSourceSelector = (state: IAppState) => state.audio?.audioSource;

const audioMediaSelector = (state: IAppState) => state.audio?.media;

const audioStreamTypeSelector = (state: IAppState) => state.audio?.streamType;

const isBottomMenuVisibleSelector = (state: IAppState) =>
  state.audio?.isBottomMenuVisible;

export const Selectors = {
  audioSourceSelector,
  audioMediaSelector,
  audioStreamTypeSelector,
  isBottomMenuVisibleSelector,
};
