/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "../types";

const notificationsSelector = (state: IAppState) =>
  state.notification?.notifications;

const hubStateSelector = (state: IAppState) =>
  state.notification?.connectionState;

export const Selectors = {
  notificationsSelector,
  hubStateSelector,
};
