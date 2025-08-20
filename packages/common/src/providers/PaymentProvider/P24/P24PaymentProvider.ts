/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IPaymentProvider } from "../IPaymentProvider";
import { ICheckoutRequestModel } from "../models";

export class P24PaymentProvider implements IPaymentProvider {
  async init(): Promise<void> {
    return Promise.resolve();
  }

  async checkout(data: ICheckoutRequestModel): Promise<void> {
    if (data.RedirectUrl) {
      location.href = data.RedirectUrl;
    } else {
      console.error("Redirect for payment is not defined");
    }
  }
}
