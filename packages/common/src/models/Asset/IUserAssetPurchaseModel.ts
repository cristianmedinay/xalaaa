/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { MediaType, PaymentStatus, RecordStatus } from "../../enums";

export const isRental = (
  purchase: IUserPurchasesModel
): purchase is RentalsModel => {
  return "AssetPurchasePeriodType" in purchase;
};

export const isSubscription = (
  purchase: IUserPurchasesModel
): purchase is SubscriptionsModel => {
  return "SubscriptionId" in purchase;
};

export enum PurchaseType {
  OneTime = "OneTime",
  Rental = "Rental",
  Subscription = "Subscription",
}

export type BasePurchaseModel = {
  Guid: string;
  PaymentDate: string;
  Status: PaymentStatus;
  Amount: number;
  Currency: string;
  MediaId: number;
  MediaTitle: string;
  MediaType: MediaType;
  PaymentProvider: string;
  Active: boolean;
};

export type RentalsModel = BasePurchaseModel & {
  CanBuyAgain: boolean;
  ValidTo: string;
  AssetPurchasePeriodType: string;
};

export type SubscriptionsModel = BasePurchaseModel & {
  SubscriptionKey: string;
  ValidFrom: string;
  ValidTo: string;
  CanReactivate: boolean;
  CanCancel: boolean;
  CanChangePaymentMethod: boolean;
  SubscriptionId: number;
  Payments: PaymentModel[];
};

export type PaymentModel = {
  Guid: string;
  PaymentDate: string;
  Status: PaymentStatus;
  Amount: number;
};

export type IUserPurchasesModel =
  | BasePurchaseModel
  | RentalsModel
  | SubscriptionsModel;

export interface IUserPurchasesAggregatedModel {
  OneTimePurchases: BasePurchaseModel[];
  Rentals: RentalsModel[];
  Subscriptions: SubscriptionsModel[];
}

export interface IUserAssetPurchaseModel {
  Active: boolean;

  AssetId: number;

  PaymentId: number;

  UserId: number;

  AvailableFrom: string;

  AvailableTo: string;

  UpToDate: boolean;

  UserSubscriptionId?: number;

  AssetTitle: string;

  AssetTypeCode: MediaType;

  AssetTypeTranslationKey: string;

  PaymentKey: string;

  Price: number;

  Currency: string;

  PaymentStatusCode: PaymentStatus;

  PaymentStatusTranslationKey: string;

  PaymentMethod: string;

  PaymentTypeCode: string;

  PaymentTypeTranslationKey: string;

  RecordStatus: RecordStatus;

  PaymentProvider: string;
}
