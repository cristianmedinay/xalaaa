/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserDeleteAccountRequestModel } from "providers/DataProvider/Internal/models";

import {
  IErrorModel,
  IMediaChannelsForUserModel,
  ITownsListModel,
  IUserAssetPropertiesModel,
  IUserAssetPurchasesListModel,
  IUserAssetPurchasesSearchFilterModel,
  IUserConsentModel,
  IUserModel,
  IUserProductModel,
  IUserPurchasesAggregatedModel,
  IUserSettingsModel,
} from "../../models";

import * as Consts from "./consts";
import {
  ICancelSubscriptionAction,
  ICancelSubscriptionFailureAction,
  ICancelSubscriptionSuccessAction,
  IChangeSubscriptionPaymentMethodAction,
  IChangeSubscriptionPaymentMethodFailureAction,
  IChangeSubscriptionPaymentMethodSuccessAction,
  IDeleteAccountAction,
  IDeleteAccountFailureAction,
  IDeleteAccountSuccessAction,
  IGetMediaChannelsForTownAction,
  IGetMediaChannelsForTownFailureAction,
  IGetMediaChannelsForTownSuccessAction,
  IGetProductsAction,
  IGetProductsFailureAction,
  IGetProductsSuccessAction,
  IGetProfileAction,
  IGetProfileFailureAction,
  IGetProfileSuccessAction,
  IGetTownsAction,
  IGetTownsFailureAction,
  IGetTownsSuccessAction,
  IGetUserAssetsPropertiesAction,
  IGetUserAssetsPropertiesFailureAction,
  IGetUserAssetsPropertiesSuccessAction,
  IGetUserConsentsAction,
  IGetUserConsentsFailureAction,
  IGetUserConsentsSuccessAction,
  IGetUserPurchasesAggregatedAction,
  IGetUserPurchasesAggregatedFailureAction,
  IGetUserPurchasesAggregatedSuccessAction,
  IGetUserSettingsAction,
  IGetUserSettingsFailureAction,
  IGetUserSettingsSuccessAction,
  IReactivateSubscriptionAction,
  IReactivateSubscriptionFailureAction,
  IReactivateSubscriptionSuccessAction,
  ISearchUserAssetPurchasesAction,
  ISearchUserAssetPurchasesFailureAction,
  ISearchUserAssetPurchasesSuccessAction,
  IUpdateProfileAction,
  IUpdateProfileFailureAction,
  IUpdateProfileSuccessAction,
  IUpdateUserConsentAction,
  IUpdateUserConsentFailureAction,
  IUpdateUserConsentsAction,
  IUpdateUserConsentsFailureAction,
  IUpdateUserConsentsSuccessAction,
  IUpdateUserConsentSuccessAction,
  IUpdateUserSettingsAction,
  IUpdateUserSettingsFailureAction,
  IUpdateUserSettingsSuccessAction,
} from "./types";

export const getProfile = (): IGetProfileAction => {
  return {
    type: Consts.GET_PROFILE,
  };
};

export const getProfileSuccess = (
  data: IUserModel
): IGetProfileSuccessAction => {
  return {
    payload: data,
    type: Consts.GET_PROFILE_SUCCESS,
  };
};

export const getProfileFailure = (
  error?: IErrorModel
): IGetProfileFailureAction => {
  return {
    error,
    type: Consts.GET_PROFILE_FAILURE,
  };
};

export const updateProfile = (data: IUserModel): IUpdateProfileAction => {
  return {
    payload: data,
    type: Consts.UPDATE_PROFILE,
  };
};

export const updateProfileSuccess = (
  data: IUserModel
): IUpdateProfileSuccessAction => {
  return {
    payload: data,
    type: Consts.UPDATE_PROFILE_SUCCESS,
  };
};

export const updateProfileFailure = (
  error?: IErrorModel
): IUpdateProfileFailureAction => {
  return {
    error,
    type: Consts.UPDATE_PROFILE_FAILURE,
  };
};

export const deleteAccount = (
  data: IUserDeleteAccountRequestModel
): IDeleteAccountAction => {
  return {
    payload: data,
    type: Consts.DELETE_ACCOUNT,
  };
};

export const deleteAccountSuccess = (): IDeleteAccountSuccessAction => {
  return {
    type: Consts.DELETE_ACCOUNT_SUCCESS,
  };
};

export const deleteAccountFailure = (
  error?: IErrorModel
): IDeleteAccountFailureAction => {
  return {
    error,
    type: Consts.DELETE_ACCOUNT_FAILURE,
  };
};

export const getUserAssetsProperties = (): IGetUserAssetsPropertiesAction => {
  return {
    type: Consts.GET_USER_ASSETS_PROPERTIES,
  };
};

export const getUserAssetsPropertiesSuccess = (
  userAssetsProperties: IUserAssetPropertiesModel[]
): IGetUserAssetsPropertiesSuccessAction => {
  return {
    payload: userAssetsProperties,
    type: Consts.GET_USER_ASSETS_PROPERTIES_SUCCESS,
  };
};

export const getUserAssetsPropertiesFailure = (
  error?: IErrorModel
): IGetUserAssetsPropertiesFailureAction => {
  return {
    error,
    type: Consts.GET_USER_ASSETS_PROPERTIES_FAILURE,
  };
};

export const getUserConsents = (): IGetUserConsentsAction => {
  return {
    type: Consts.GET_USER_CONSENTS,
  };
};

export const getUserConsentsSuccess = (
  data: IUserConsentModel[]
): IGetUserConsentsSuccessAction => {
  return {
    payload: data,
    type: Consts.GET_USER_CONSENTS_SUCCESS,
  };
};

export const getUserConsentsFailure = (
  error?: IErrorModel
): IGetUserConsentsFailureAction => {
  return {
    error,
    type: Consts.GET_USER_CONSENTS_FAILURE,
  };
};

export const updateUserConsent = (
  data: IUserConsentModel
): IUpdateUserConsentAction => {
  return {
    payload: data,
    type: Consts.UPDATE_USER_CONSENT,
  };
};

export const updateUserConsentSuccess = (
  data: IUserConsentModel
): IUpdateUserConsentSuccessAction => {
  return {
    payload: data,
    type: Consts.UPDATE_USER_CONSENT_SUCCESS,
  };
};

export const updateUserConsentFailure = (
  error?: IErrorModel
): IUpdateUserConsentFailureAction => {
  return {
    error,
    type: Consts.UPDATE_USER_CONSENT_FAILURE,
  };
};

export const updateUserConsents = (
  data: IUserConsentModel[]
): IUpdateUserConsentsAction => {
  return {
    payload: data,
    type: Consts.UPDATE_USER_CONSENTS,
  };
};

export const updateUserConsentsSuccess = (
  data: IUserConsentModel[]
): IUpdateUserConsentsSuccessAction => {
  return {
    payload: data,
    type: Consts.UPDATE_USER_CONSENTS_SUCCESS,
  };
};

export const updateUserConsentsFailure = (
  error?: IErrorModel
): IUpdateUserConsentsFailureAction => {
  return {
    error,
    type: Consts.UPDATE_USER_CONSENTS_FAILURE,
  };
};

export const getProducts = (): IGetProductsAction => {
  return {
    type: Consts.GET_PRODUCTS,
  };
};

export const getProductsSuccess = (
  data: IUserProductModel[]
): IGetProductsSuccessAction => {
  return {
    payload: data,
    type: Consts.GET_PRODUCTS_SUCCESS,
  };
};

export const getProductsFailure = (
  error?: IErrorModel
): IGetProductsFailureAction => {
  return {
    error,
    type: Consts.GET_PRODUCTS_FAILURE,
  };
};

export const cancelSubscription = (
  userSubscriptionId: number,
  meta?: {
    onSuccess?: (response?: IUserAssetPurchasesListModel) => void;
    onFailure?: (error?: IErrorModel) => void;
  }
): ICancelSubscriptionAction => {
  return {
    type: Consts.CANCEL_SUBSCRIPTION,
    userSubscriptionId,
    meta,
  };
};

export const cancelSubscriptionSuccess = (
  userSubscriptionId: number
): ICancelSubscriptionSuccessAction => {
  return {
    type: Consts.CANCEL_SUBSCRIPTION_SUCCESS,
    userSubscriptionId,
  };
};

export const cancelSubscriptionFailure = (
  userSubscriptionId: number,
  error?: IErrorModel
): ICancelSubscriptionFailureAction => {
  return {
    error,
    userSubscriptionId,
    type: Consts.CANCEL_SUBSCRIPTION_FAILURE,
  };
};

export const reactivateSubscription = (
  userSubscriptionId: number,
  meta?: {
    onSuccess?: (response?: IUserAssetPurchasesListModel) => void;
    onFailure?: (error?: IErrorModel) => void;
  }
): IReactivateSubscriptionAction => {
  return {
    type: Consts.REACTIVATE_SUBSCRIPTION,
    userSubscriptionId,
    meta,
  };
};

export const reactivateSubscriptionSuccess = (
  userSubscriptionId: number
): IReactivateSubscriptionSuccessAction => {
  return {
    type: Consts.REACTIVATE_SUBSCRIPTION_SUCCESS,
    userSubscriptionId,
  };
};

export const reactivateSubscriptionFailure = (
  userSubscriptionId: number,
  error?: IErrorModel
): IReactivateSubscriptionFailureAction => {
  return {
    error,
    userSubscriptionId,
    type: Consts.REACTIVATE_SUBSCRIPTION_FAILURE,
  };
};

export const searchUserAssetPurchases = (
  filter: IUserAssetPurchasesSearchFilterModel
): ISearchUserAssetPurchasesAction => {
  return {
    type: Consts.SEARCH_USER_ASSET_PURCHASES,
    filter,
  };
};

export const searchUserAssetPurchasesSuccess = (
  data: IUserAssetPurchasesListModel
): ISearchUserAssetPurchasesSuccessAction => {
  return {
    type: Consts.SEARCH_USER_ASSET_PURCHASES_SUCCESS,
    payload: data,
  };
};

export const searchUserAssetPurchasesFailure = (
  error?: IErrorModel
): ISearchUserAssetPurchasesFailureAction => {
  return {
    error,
    type: Consts.SEARCH_USER_ASSET_PURCHASES_FAILURE,
  };
};

export const getUserPurchasesAggregated =
  (): IGetUserPurchasesAggregatedAction => {
    return {
      type: Consts.GET_USER_PURCHASES_AGGREGATED,
    };
  };

export const getUserPurchasesAggregatedSuccess = (
  data: IUserPurchasesAggregatedModel
): IGetUserPurchasesAggregatedSuccessAction => {
  return {
    type: Consts.GET_USER_PURCHASES_AGGREGATED_SUCCESS,
    payload: data,
  };
};

export const getUserPurchasesAggregatedFailure = (
  error?: IErrorModel
): IGetUserPurchasesAggregatedFailureAction => {
  return {
    type: Consts.GET_USER_PURCHASES_AGGREGATED_FAILURE,
    error: error,
  };
};

export const changeSubscriptionPaymentMethod = (
  userSubscriptionId: number,
  paymentProvider: string,
  meta?: {
    onSuccess?: (response?: IUserAssetPurchasesListModel) => void;
    onFailure?: (error?: IErrorModel) => void;
  }
): IChangeSubscriptionPaymentMethodAction => {
  return {
    type: Consts.CHANGE_SUBSCRIPTION_PAYMENT_METHOD,
    userSubscriptionId,
    paymentProvider,
    meta,
  };
};

export const changeSubscriptionPaymentMethodSuccess = (
  userSubscriptionId: number
): IChangeSubscriptionPaymentMethodSuccessAction => {
  return {
    type: Consts.CHANGE_SUBSCRIPTION_PAYMENT_METHOD_SUCCESS,
    userSubscriptionId,
  };
};

export const changeSubscriptionPaymentMethodFailure = (
  userSubscriptionId: number,
  error?: IErrorModel
): IChangeSubscriptionPaymentMethodFailureAction => {
  return {
    error,
    userSubscriptionId,
    type: Consts.CHANGE_SUBSCRIPTION_PAYMENT_METHOD_FAILURE,
  };
};

export const getTowns = (): IGetTownsAction => {
  return {
    type: Consts.GET_TOWNS,
  };
};

export const getTownsSuccess = (
  data: ITownsListModel
): IGetTownsSuccessAction => {
  return {
    payload: data,
    type: Consts.GET_TOWNS_SUCCESS,
  };
};

export const getTownsFailure = (
  error?: IErrorModel
): IGetTownsFailureAction => {
  return {
    error,
    type: Consts.GET_TOWNS_FAILURE,
  };
};

export const getUserSettings = (): IGetUserSettingsAction => {
  return {
    type: Consts.GET_USER_SETTINGS,
  };
};

export const getUserSettingsSuccess = (
  data: IUserSettingsModel
): IGetUserSettingsSuccessAction => {
  return {
    payload: data,
    type: Consts.GET_USER_SETTINGS_SUCCESS,
  };
};

export const getUserSettingsFailure = (
  error?: IErrorModel
): IGetUserSettingsFailureAction => {
  return {
    error,
    type: Consts.GET_USER_SETTINGS_FAILURE,
  };
};

export const updateUserSettings = (
  data: IUserSettingsModel
): IUpdateUserSettingsAction => {
  return {
    payload: data,
    type: Consts.UPDATE_USER_SETTINGS,
  };
};

export const updateUserSettingsSuccess = (
  data: IUserSettingsModel
): IUpdateUserSettingsSuccessAction => {
  return {
    payload: data,
    type: Consts.UPDATE_USER_SETTINGS_SUCCESS,
  };
};

export const updateUserSettingsFailure = (
  error?: IErrorModel
): IUpdateUserSettingsFailureAction => {
  return {
    error,
    type: Consts.UPDATE_USER_SETTINGS_FAILURE,
  };
};

export const getMediaChannelsForTown = (
  townId: number,
  onGoingNow: boolean
): IGetMediaChannelsForTownAction => {
  return {
    townId,
    onGoingNow,
    type: Consts.GET_MEDIA_CHANNELS_FOR_TOWN,
  };
};

export const getMediaChannelsForTownSuccess = (
  data: Partial<IMediaChannelsForUserModel>[]
): IGetMediaChannelsForTownSuccessAction => {
  return {
    payload: data,
    type: Consts.GET_MEDIA_CHANNELS_FOR_TOWN_SUCCESS,
  };
};

export const getMediaChannelsForTownFailure = (
  error?: IErrorModel
): IGetMediaChannelsForTownFailureAction => {
  return {
    error,
    type: Consts.GET_MEDIA_CHANNELS_FOR_TOWN_FAILURE,
  };
};

export const Actions = {
  getProfile,
  updateProfile,
  deleteAccount,
  getUserAssetsProperties,
  getUserAssetsPropertiesSuccess,
  getUserConsents,
  updateUserConsent,
  updateUserConsents,
  getProducts,
  cancelSubscription,
  reactivateSubscription,
  searchUserAssetPurchases,
  getUserPurchasesAggregated,
  changeSubscriptionPaymentMethod,
  getTowns,
  getUserSettings,
  updateUserSettings,
  getMediaChannelsForTown,
};
