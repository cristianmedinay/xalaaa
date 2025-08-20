/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { PaymentStatus } from "enums";

export interface INotCompletedPayment {
  Key: string;
  Status: PaymentStatus;
  Provider: string;
}
