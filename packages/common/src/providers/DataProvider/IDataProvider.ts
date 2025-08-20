/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAuthCodeRequestModel } from "models/Auth/IAuthCodeRequestModel";
import { IMediaChannelsForUserModel } from "models/Media/IMediaChannelsForUserModel";

import { ScreenType } from "../../enums";
import {
  EpgDay,
  IAnalyticsMarkerModel,
  IAssetAgeRestrictionModel,
  IAssetContentModel,
  IAssetImageModel,
  IAssetInAssetModel,
  IAssetInAssetSearchResponseModel,
  IAssetListModel,
  IAssetModel,
  IAssetPriceModel,
  IAssetPurchasePeriodTypeModel,
  IAssetSearchFilterModel,
  IAssetsInAssetSearchFilterModel,
  IAuthRequestModel,
  IAuthResponseModel,
  IAuthVerifyLoginModel,
  IChangePasswordModel,
  IConfigurationBrandingModel,
  IConfigurationModel,
  IConfigurationTranslationsModel,
  IConfirmAccountWithPasswordModel,
  ICurrencyModel,
  IForgotPasswordModel,
  IInsertAssetRequestModel,
  IInsertAssetResponseModel,
  IInviteManyUsersModel,
  ILoginCodeModel,
  IMediaCategoryListModel,
  IMediaListModel,
  IMediaListOptionsModel,
  IMediaModel,
  IMediaOptionsModel,
  IMediaPaymentRequestModel,
  IMediaPaymentResponseModel,
  IMediaPlayInfoModel,
  IMediaPlayInfoOptionsModel,
  IMediaPurchaseOfferModel,
  IMediaSearchFilterModel,
  IMediaSearchMediaInMediaFilterModel,
  IMediaSearchStateModel,
  IPaymentListModel,
  IPaymentModel,
  IPaymentOptionsModel,
  IPaymentSearchFilterModel,
  IPaymentStatusModel,
  IPaymentTypeMappingAndOptionsModel,
  IRegisterConfirmEmailModel,
  IRegisterRequestEmailModel,
  IRemoveManyUsersModel,
  IResetForgotPasswordModel,
  IResetPasswordModel,
  IScreenModel,
  ITownsListModel,
  IUserAssetPropertiesModel,
  IUserAssetPurchasesListModel,
  IUserAssetPurchasesSearchFilterModel,
  IUserConsentModel,
  IUserDeviceModel,
  IUserInAssetModel,
  IUserInAssetRoleModel,
  IUserModel,
  IUserProductModel,
  IUserPurchasesAggregatedModel,
  IUserRequestOptionsModel,
  IUserSettingsModel,
} from "../../models";
import { IMediaChannelProgramOptionsModel } from "../../models/Media/IMediaChannelProgramOptionsModel";

import {
  IAssetPriceListModel,
  IAssetPriceSearchFilterModel,
  ICatchupInsertModel,
  ICatchupInsertResponseModel,
  IResendConfirmationByUserModel,
  IUserDeleteAccountRequestModel,
  IUsersInAssetListModel,
  IUsersInAssetSearchFilterModel,
  IUsersListModel,
  IUsersSearchFilterModel,
} from "./Internal/models";

export interface IDataProvider {
  initHttpFactory: () => void;

  initSession: () => void;

  getDefaultBranding: () => IConfigurationBrandingModel | undefined;

  getDefaultTranslations: () => IConfigurationTranslationsModel | undefined;

  getResource: (resourceKey: string) => any;

  getConfiguration: (
    isNewConfigAvailable?: boolean
  ) => Promise<IConfigurationModel | undefined>;

  isNewConfigAvailable: () => Promise<boolean>;

  getConfigurationOffline: () => Promise<IConfigurationModel | undefined>;

  getScreenConfiguration(
    screenType: ScreenType,
    screenId?: number
  ): Promise<IScreenModel | undefined>;

  getMedia: (options: IMediaOptionsModel) => Promise<IMediaModel>;

  getMediaPlayInfo: (
    options: IMediaPlayInfoOptionsModel
  ) => Promise<IMediaPlayInfoModel>;

  searchMedia: (
    filter: IMediaSearchFilterModel
  ) => Promise<IMediaSearchStateModel>;

  searchMediaInMedia: (
    filter: IMediaSearchMediaInMediaFilterModel
  ) => Promise<IMediaListModel>;

  getMediaList: (options: IMediaListOptionsModel) => Promise<IMediaListModel>;

  getMediaCategories: () => Promise<IMediaCategoryListModel>;

  getTowns: () => Promise<ITownsListModel>;

  // TODO Check if needed
  getMediaStatistics: (options: any) => Promise<any>;

  getEpgDays: () => Promise<EpgDay[]>;

  selectMediaPurchaseOffers: (
    mediaId: number
  ) => Promise<IMediaPurchaseOfferModel[]>;

  getMediaChannelsForUser: (
    onGoingNow: boolean
  ) => Promise<Partial<IMediaChannelsForUserModel>[]>;

  getMediaChannelsForTown: (
    townId: number,
    onGoingNow: boolean
  ) => Promise<Partial<IMediaChannelsForUserModel>[]>;

  getMediaChannelPrograms: (
    options: IMediaChannelProgramOptionsModel
  ) => Promise<IMediaListModel>;

  setWatchProgress: (mediaId: number, progressInSeconds: number) => void;

  getUserAssetsProperties: () => Promise<IUserAssetPropertiesModel[]>;

  isOnMyList: (mediaId: number) => Promise<boolean>;

  addToMyList: (mediaId: number) => Promise<void>;

  removeFromMyList: (mediaId: number) => Promise<void>;

  getMyListIds: () => Promise<number[]>;

  getProducts: () => Promise<IUserProductModel[]>;

  buyMedia: (
    data: IMediaPaymentRequestModel
  ) => Promise<IMediaPaymentResponseModel>;

  // AUTH
  linkLoginCode: (data: ILoginCodeModel) => Promise<ILoginCodeModel>;

  getLoginCode: () => Promise<IAuthCodeRequestModel>;

  verifyLogin: (data: IAuthVerifyLoginModel) => Promise<IAuthResponseModel>;

  confirmRead: (guid: string) => Promise<IAuthResponseModel>;

  signIn: (data: IAuthRequestModel) => Promise<IAuthResponseModel>;

  signOut: (device: IUserDeviceModel) => Promise<IAuthResponseModel>;

  forgotPassword: (data: IForgotPasswordModel) => Promise<boolean>;

  resetForgotPassword: (data: IResetForgotPasswordModel) => Promise<boolean>;

  registerEmail: (data: IRegisterRequestEmailModel) => Promise<boolean>;

  registerConfirmEmail: (
    data: IRegisterConfirmEmailModel
  ) => Promise<IAuthResponseModel>;

  registerConfirmAccount: (
    data: IConfirmAccountWithPasswordModel
  ) => Promise<IAuthResponseModel>;

  resendConfirmationEmailByUser: (
    data: IResendConfirmationByUserModel
  ) => Promise<void>;

  refreshToken: (
    refreshToken: string,
    device: IUserDeviceModel
  ) => Promise<IAuthResponseModel>;

  changePassword: (data: IChangePasswordModel) => Promise<IAuthResponseModel>;

  resetPassword: (data: IResetPasswordModel) => Promise<boolean>;

  validateConfirmationToken: (token: string) => Promise<void>;

  browseUsers: (filter: IUsersSearchFilterModel) => Promise<IUsersListModel>;

  // USER IN EVENT

  getUserInAssetRoles: () => Promise<IUserInAssetRoleModel[]>;

  inviteManyUsers: (users: IInviteManyUsersModel) => Promise<void>;

  searchUsersInAsset: (
    filter: IUsersInAssetSearchFilterModel
  ) => Promise<IUsersInAssetListModel>;

  removeUserFromAsset: (
    user: IUserInAssetModel & { AssetId: number }
  ) => Promise<void>;

  removeManyUsersFromAsset: (users: IRemoveManyUsersModel) => Promise<void>;
  // USER
  getProfile: (options: IUserRequestOptionsModel) => Promise<IUserModel>;

  updateProfile: (data: IUserModel) => Promise<IUserModel>;

  getUserSettings: () => Promise<IUserSettingsModel>;

  updateUserSettings: (data: IUserSettingsModel) => Promise<IUserSettingsModel>;

  deleteAccount: (data: IUserDeleteAccountRequestModel) => Promise<void>;

  // CONSENTS
  selectUserConsents: () => Promise<IUserConsentModel[]>;

  getUserConsent: (url: string) => Promise<string>;

  updateUserConsent: (data: IUserConsentModel) => Promise<IUserConsentModel>;

  updateUserConsents: (
    data: IUserConsentModel[]
  ) => Promise<IUserConsentModel[]>;

  // PAYMENT
  getPayment: (id: number) => Promise<IPaymentModel>;

  searchPayment: (
    filter: IPaymentSearchFilterModel
  ) => Promise<IPaymentListModel>;

  getPaymentOptions: () => Promise<IPaymentOptionsModel>;

  getPaymentTypeMappingAndOptions: () => Promise<IPaymentTypeMappingAndOptionsModel>;

  getByKey: (key: string) => Promise<IPaymentModel>;

  checkStatusByKey: (key: string) => Promise<IPaymentStatusModel>;

  // SUBSCRIPTIONS
  cancelSubscription: (
    userSubscriptionId: number
  ) => Promise<IUserAssetPurchasesListModel>;

  reactivateSubscription: (
    userSubscriptionId: number
  ) => Promise<IUserAssetPurchasesListModel>;

  changeSubscriptionPaymentMethod: (
    userSubscriptionId: number
  ) => Promise<IMediaPaymentResponseModel>;

  getUserPurchasesAggregated: () => Promise<IUserPurchasesAggregatedModel>;

  searchUserAssetPurchases: (
    filter: IUserAssetPurchasesSearchFilterModel
  ) => Promise<IUserAssetPurchasesListModel>;

  // ASSETS
  searchAsset(filter: IAssetSearchFilterModel): Promise<IAssetListModel>;

  createAsset: (
    payload: IInsertAssetRequestModel
  ) => Promise<IInsertAssetResponseModel>;

  updateAsset: (payload: IAssetModel) => Promise<any>;

  getAsset: (assetId: number) => Promise<IAssetModel>;

  selectAgeRestriction: () => Promise<IAssetAgeRestrictionModel[]>;

  updateAssetContent(
    assetContent: IAssetContentModel
  ): Promise<IAssetContentModel>;

  selectCurrency(): Promise<ICurrencyModel[]>;

  insertAssetImage: (image: IAssetImageModel) => Promise<IAssetModel>;

  updateAssetImage: (image: IAssetImageModel) => Promise<IAssetModel>;

  addAssetContent(
    assetContent: IAssetContentModel
  ): Promise<IAssetContentModel>;

  getAssetPriceCollection(assetId: number): Promise<IAssetPriceModel>;

  searchAssetPriceCollection(
    filter: IAssetPriceSearchFilterModel
  ): Promise<IAssetPriceListModel>;

  selectPurchasePeriodType(): Promise<IAssetPurchasePeriodTypeModel[]>;

  saveAssetInAssetCollection(
    data: IAssetInAssetModel[]
  ): Promise<IAssetInAssetModel[]>;

  saveAssetPriceCollection(
    data: IAssetPriceModel[]
  ): Promise<IAssetPriceModel[]>;

  insertCatchup(
    data: ICatchupInsertModel
  ): Promise<ICatchupInsertResponseModel>;

  searchAssetsInAssets(
    data: IAssetsInAssetSearchFilterModel
  ): Promise<IAssetInAssetSearchResponseModel>;

  sendAnalyticsMarker(data: IAnalyticsMarkerModel): Promise<null>;
}
