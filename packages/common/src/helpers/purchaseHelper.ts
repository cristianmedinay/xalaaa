/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IUserPurchasesModel,
  RentalsModel,
  SubscriptionsModel,
} from "../models";

export class PurchaseHelper {
  static isRental = (
    purchase: IUserPurchasesModel
  ): purchase is RentalsModel => {
    return "AssetPurchasePeriodType" in purchase;
  };

  static isSubscription = (
    purchase: IUserPurchasesModel
  ): purchase is SubscriptionsModel => {
    return "SubscriptionId" in purchase;
  };
}
