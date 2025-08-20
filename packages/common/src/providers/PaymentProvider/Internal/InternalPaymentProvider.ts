/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IPaymentProvider } from "../IPaymentProvider";
import { ICheckoutRequestModel } from "../models";

export class InternalPaymentProvider implements IPaymentProvider {
  async init(): Promise<void> {
    return Promise.resolve();
  }

  async checkout(_data: ICheckoutRequestModel): Promise<void> {
    return Promise.reject("Not implemented");
  }
}
