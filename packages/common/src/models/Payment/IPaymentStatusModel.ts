/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { PaymentStatus } from "../../enums";
import { INotification } from "../Notification";

export interface IPaymentStatusModel {
  Status: PaymentStatus;
  PaymentValidTo?: string;
}

export interface INotificationPaymentStatusModel extends INotification {
  StatusCode?: PaymentStatus;
  PaymentStatus: PaymentStatus;
  EntityId: string;
  PaymentKey: string;
  PaymentId: string;
  Created: string;
  UserId: number;
  PaymentProvider: string;
}
