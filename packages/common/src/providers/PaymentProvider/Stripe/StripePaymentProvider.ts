/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Stripe } from "@stripe/stripe-js";

import { IPaymentOptionsModel } from "../../../models";
import { IPaymentProvider } from "../IPaymentProvider";
import { ICheckoutRequestModel } from "../models";

export class StripePaymentProvider implements IPaymentProvider {
  private _stripeService: Promise<Stripe | null> | undefined;
  private publicApiKey: string;

  constructor({ PublicApiKey }: IPaymentOptionsModel) {
    this.publicApiKey = PublicApiKey || "";
  }

  async init(): Promise<void> {
    const stripe = await import("@stripe/stripe-js");
    this._stripeService = stripe.loadStripe(this.publicApiKey);
  }

  async checkout(data: ICheckoutRequestModel): Promise<void> {
    if (!this._stripeService) {
      return Promise.reject("Stripe service not available");
    }

    // Get Stripe instance
    const stripe = await this._stripeService;

    if (!stripe) {
      return;
    }

    // Redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: data.SessionId,
    });

    if (result.error) {
      console.log("Stripr Checkout Error");
      console.log(result.error);
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }
}
