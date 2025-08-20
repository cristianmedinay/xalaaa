/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "../types";

const offlineModeSelector = (state: IAppState) => state.offlineMode;

export const Selectors = {
  offlineModeSelector,
};
