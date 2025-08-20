/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IPaymentOptionsModel } from "models/Payment";

import { InternalPaymentProvider } from "./Internal";
import { IPaymentProvider } from "./IPaymentProvider";
import { P24PaymentProvider } from "./P24";
import { StripePaymentProvider } from "./Stripe";

let PaymentProvider: IPaymentProvider;

export const definePaymentProvider = async (options: IPaymentOptionsModel) => {
  switch (options.Provider) {
    case "P24":
      PaymentProvider = new P24PaymentProvider();
      break;
    case "STRIPE":
      PaymentProvider = new StripePaymentProvider(options);
      break;
    default:
      PaymentProvider = new InternalPaymentProvider();
      break;
  }

  return PaymentProvider;
};

export { PaymentProvider };
