/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserDeleteAccountRequestModel } from "providers/DataProvider/Internal/models";

import {
  IErrorModel,
  IMediaChannelsForUserModel,
  IStateModel,
  ITownsListModel,
  IUserAssetPropertiesModel,
  IUserAssetPurchaseModel,
  IUserAssetPurchasesListModel,
  IUserAssetPurchasesSearchFilterModel,
  IUserChannelsModel,
  IUserConsentModel,
  IUserModel,
  IUserProductModel,
  IUserPurchasesAggregatedModel,
  IUserSettingsModel,
} from "../../models";

import * as Consts from "./consts";

export interface IUserState {
  action?: UserActionsTypes;
  profile: IStateModel<IUserModel>;
  consents: IStateModel<IUserConsentModel[]>;
  consent: IStateModel<IUserConsentModel>;
  settings: IUserSettingsModel;
  purchase: {
    [purchaseId: string]: IStateModel<IUserAssetPurchaseModel>;
  };
  purchases: IStateModel<IUserPurchasesAggregatedModel>;
  towns: ITownsListModel;
  channels: IUserChannelsModel;
}

export interface IGetProfileAction {
  type: typeof Consts.GET_PROFILE;
}

export interface IGetProfileSuccessAction {
  type: typeof Consts.GET_PROFILE_SUCCESS;
  payload: IUserModel;
}

export interface IGetProfileFailureAction {
  type: typeof Consts.GET_PROFILE_FAILURE;
  error?: IErrorModel;
}

export interface IUpdateProfileAction {
  type: typeof Consts.UPDATE_PROFILE;
  payload: IUserModel;
}

export interface IUpdateProfileSuccessAction {
  type: typeof Consts.UPDATE_PROFILE_SUCCESS;
  payload: IUserModel;
}

export interface IUpdateProfileFailureAction {
  type: typeof Consts.UPDATE_PROFILE_FAILURE;
  error?: IErrorModel;
}

export interface IDeleteAccountAction {
  type: typeof Consts.DELETE_ACCOUNT;
  payload: IUserDeleteAccountRequestModel;
}

export interface IDeleteAccountSuccessAction {
  type: typeof Consts.DELETE_ACCOUNT_SUCCESS;
}

export interface IDeleteAccountFailureAction {
  type: typeof Consts.DELETE_ACCOUNT_FAILURE;
  error?: IErrorModel;
}

export interface IGetUserAssetsPropertiesAction {
  type: typeof Consts.GET_USER_ASSETS_PROPERTIES;
}

export interface IGetUserAssetsPropertiesSuccessAction {
  type: typeof Consts.GET_USER_ASSETS_PROPERTIES_SUCCESS;
  payload: IUserAssetPropertiesModel[];
}

export interface IGetUserAssetsPropertiesFailureAction {
  type: typeof Consts.GET_USER_ASSETS_PROPERTIES_FAILURE;
  error?: IErrorModel;
}

export interface IGetUserConsentsAction {
  type: typeof Consts.GET_USER_CONSENTS;
}

export interface IGetUserConsentsSuccessAction {
  type: typeof Consts.GET_USER_CONSENTS_SUCCESS;
  payload: IUserConsentModel[];
}

export interface IGetUserConsentsFailureAction {
  type: typeof Consts.GET_USER_CONSENTS_FAILURE;
  error?: IErrorModel;
}

export interface IUpdateUserConsentAction {
  type: typeof Consts.UPDATE_USER_CONSENT;
  payload: IUserConsentModel;
}

export interface IUpdateUserConsentSuccessAction {
  type: typeof Consts.UPDATE_USER_CONSENT_SUCCESS;
  payload: IUserConsentModel;
}

export interface IUpdateUserConsentFailureAction {
  type: typeof Consts.UPDATE_USER_CONSENT_FAILURE;
  error?: IErrorModel;
}

export interface IUpdateUserConsentsAction {
  type: typeof Consts.UPDATE_USER_CONSENTS;
  payload: IUserConsentModel[];
}

export interface IUpdateUserConsentsSuccessAction {
  type: typeof Consts.UPDATE_USER_CONSENTS_SUCCESS;
  payload: IUserConsentModel[];
}

export interface IUpdateUserConsentsFailureAction {
  type: typeof Consts.UPDATE_USER_CONSENTS_FAILURE;
  error?: IErrorModel;
}

export interface IGetProductsAction {
  type: typeof Consts.GET_PRODUCTS;
}

export interface IGetProductsSuccessAction {
  type: typeof Consts.GET_PRODUCTS_SUCCESS;
  payload: IUserProductModel[];
}

export interface IGetProductsFailureAction {
  type: typeof Consts.GET_PRODUCTS_FAILURE;
  error?: IErrorModel;
}

export interface ICancelSubscriptionAction {
  type: typeof Consts.CANCEL_SUBSCRIPTION;
  userSubscriptionId: number;
  meta?: {
    onSuccess?: (response?: IUserAssetPurchasesListModel) => void;
    onFailure?: (error?: IErrorModel) => void;
  };
}

export interface ICancelSubscriptionSuccessAction {
  type: typeof Consts.CANCEL_SUBSCRIPTION_SUCCESS;
  userSubscriptionId: number;
}

export interface ICancelSubscriptionFailureAction {
  type: typeof Consts.CANCEL_SUBSCRIPTION_FAILURE;
  error?: IErrorModel;
  userSubscriptionId: number;
}

export interface IReactivateSubscriptionAction {
  type: typeof Consts.REACTIVATE_SUBSCRIPTION;
  userSubscriptionId: number;
  meta?: {
    onSuccess?: (response?: IUserAssetPurchasesListModel) => void;
    onFailure?: (error?: IErrorModel) => void;
  };
}

export interface IReactivateSubscriptionSuccessAction {
  type: typeof Consts.REACTIVATE_SUBSCRIPTION_SUCCESS;
  userSubscriptionId: number;
}

export interface IReactivateSubscriptionFailureAction {
  type: typeof Consts.REACTIVATE_SUBSCRIPTION_FAILURE;
  error?: IErrorModel;
  userSubscriptionId: number;
}

export interface ISearchUserAssetPurchasesAction {
  type: typeof Consts.SEARCH_USER_ASSET_PURCHASES;
  filter: IUserAssetPurchasesSearchFilterModel;
}

export interface ISearchUserAssetPurchasesSuccessAction {
  type: typeof Consts.SEARCH_USER_ASSET_PURCHASES_SUCCESS;
  payload: IUserAssetPurchasesListModel;
}

export interface ISearchUserAssetPurchasesFailureAction {
  type: typeof Consts.SEARCH_USER_ASSET_PURCHASES_FAILURE;
  error?: IErrorModel;
}

export interface IGetUserPurchasesAggregatedAction {
  type: typeof Consts.GET_USER_PURCHASES_AGGREGATED;
}

export interface IGetUserPurchasesAggregatedSuccessAction {
  type: typeof Consts.GET_USER_PURCHASES_AGGREGATED_SUCCESS;
  payload: IUserPurchasesAggregatedModel;
}

export interface IGetUserPurchasesAggregatedFailureAction {
  type: typeof Consts.GET_USER_PURCHASES_AGGREGATED_FAILURE;
  error?: IErrorModel;
}

export interface IChangeSubscriptionPaymentMethodAction {
  type: typeof Consts.CHANGE_SUBSCRIPTION_PAYMENT_METHOD;
  userSubscriptionId: number;
  paymentProvider: string;
  meta?: {
    onSuccess?: (response?: IUserAssetPurchasesListModel) => void;
    onFailure?: (error?: IErrorModel) => void;
  };
}

export interface IChangeSubscriptionPaymentMethodSuccessAction {
  type: typeof Consts.CHANGE_SUBSCRIPTION_PAYMENT_METHOD_SUCCESS;
  userSubscriptionId: number;
}

export interface IChangeSubscriptionPaymentMethodFailureAction {
  type: typeof Consts.CHANGE_SUBSCRIPTION_PAYMENT_METHOD_FAILURE;
  error?: IErrorModel;
  userSubscriptionId: number;
}

export interface IGetTownsAction {
  type: typeof Consts.GET_TOWNS;
}

export interface IGetTownsSuccessAction {
  type: typeof Consts.GET_TOWNS_SUCCESS;
  payload: ITownsListModel;
}

export interface IGetTownsFailureAction {
  type: typeof Consts.GET_TOWNS_FAILURE;
  error?: IErrorModel;
}

export interface IGetUserSettingsAction {
  type: typeof Consts.GET_USER_SETTINGS;
}

export interface IGetUserSettingsSuccessAction {
  type: typeof Consts.GET_USER_SETTINGS_SUCCESS;
  payload: IUserSettingsModel;
}

export interface IGetUserSettingsFailureAction {
  type: typeof Consts.GET_USER_SETTINGS_FAILURE;
  error?: IErrorModel;
}

export interface IUpdateUserSettingsAction {
  type: typeof Consts.UPDATE_USER_SETTINGS;
  payload: IUserSettingsModel;
}

export interface IUpdateUserSettingsSuccessAction {
  type: typeof Consts.UPDATE_USER_SETTINGS_SUCCESS;
  payload: IUserSettingsModel;
}

export interface IUpdateUserSettingsFailureAction {
  type: typeof Consts.UPDATE_USER_SETTINGS_FAILURE;
  error?: IErrorModel;
}

export interface IGetMediaChannelsForTownAction {
  townId: number;
  onGoingNow: boolean;
  type: typeof Consts.GET_MEDIA_CHANNELS_FOR_TOWN;
}

export interface IGetMediaChannelsForTownSuccessAction {
  type: typeof Consts.GET_MEDIA_CHANNELS_FOR_TOWN_SUCCESS;
  payload: Partial<IMediaChannelsForUserModel>[];
}

export interface IGetMediaChannelsForTownFailureAction {
  type: typeof Consts.GET_MEDIA_CHANNELS_FOR_TOWN_FAILURE;
  error?: IErrorModel;
}

export type UserActionsTypes =
  | IGetProfileAction
  | IGetProfileSuccessAction
  | IGetProfileFailureAction
  | IUpdateProfileAction
  | IUpdateProfileSuccessAction
  | IUpdateProfileFailureAction
  | IDeleteAccountAction
  | IDeleteAccountSuccessAction
  | IDeleteAccountFailureAction
  | IGetUserAssetsPropertiesAction
  | IGetUserAssetsPropertiesSuccessAction
  | IGetUserConsentsAction
  | IGetUserConsentsSuccessAction
  | IGetUserConsentsFailureAction
  | IUpdateUserConsentAction
  | IUpdateUserConsentSuccessAction
  | IUpdateUserConsentFailureAction
  | IUpdateUserConsentsAction
  | IUpdateUserConsentsSuccessAction
  | IUpdateUserConsentsFailureAction
  | IGetProductsAction
  | IGetProductsSuccessAction
  | IGetProductsFailureAction
  | ICancelSubscriptionAction
  | ICancelSubscriptionSuccessAction
  | ICancelSubscriptionFailureAction
  | IReactivateSubscriptionAction
  | IReactivateSubscriptionSuccessAction
  | IReactivateSubscriptionFailureAction
  | ISearchUserAssetPurchasesAction
  | ISearchUserAssetPurchasesSuccessAction
  | ISearchUserAssetPurchasesFailureAction
  | IGetUserPurchasesAggregatedAction
  | IGetUserPurchasesAggregatedSuccessAction
  | IGetUserPurchasesAggregatedFailureAction
  | IChangeSubscriptionPaymentMethodAction
  | IChangeSubscriptionPaymentMethodSuccessAction
  | IChangeSubscriptionPaymentMethodFailureAction
  | IGetTownsAction
  | IGetTownsFailureAction
  | IGetTownsSuccessAction
  | IGetUserSettingsAction
  | IGetUserSettingsFailureAction
  | IGetUserSettingsSuccessAction
  | IUpdateUserSettingsAction
  | IUpdateUserSettingsSuccessAction
  | IUpdateUserSettingsFailureAction
  | IGetMediaChannelsForTownAction
  | IGetMediaChannelsForTownSuccessAction
  | IGetMediaChannelsForTownFailureAction;
