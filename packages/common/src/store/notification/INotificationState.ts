/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { HubConnectionState } from "@microsoft/signalr";

import { INotification } from "../../models";

export interface INotificationState {
  error?: unknown;
  connectionState?: HubConnectionState;
  notifications: INotification[];
}
