/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ICheckoutRequestModel } from "./models";

export interface IPaymentProvider {
  init: () => Promise<void>;
  checkout: (data: ICheckoutRequestModel) => Promise<void>;
}
