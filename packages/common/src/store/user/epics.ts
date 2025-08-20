/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { go, replace } from "connected-react-router";
import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import { EMPTY, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { ROUTES } from "../../constants";
import { OperationResultType } from "../../enums";
import { StorageHelper } from "../../helpers";
import {
  IErrorModel,
  ITownsListModel,
  IUserConsentModel,
  IUserInfoModel,
  IUserModel,
  IUserProductModel,
  IUserSettingsModel,
  OperationResult,
  UploadFileInfoModel,
} from "../../models";
import { DataProvider } from "../../providers/DataProvider";
import {
  definePaymentProvider,
  PaymentProvider,
} from "../../providers/PaymentProvider";
import { StorageManager, StorageService } from "../../services";
import * as AuthStore from "../auth";
import { refreshUser } from "../auth/actions";
import { clearHistory } from "../index";
import { IAppState } from "../types";

import {
  cancelSubscriptionFailure,
  cancelSubscriptionSuccess,
  deleteAccountFailure,
  deleteAccountSuccess,
  getMediaChannelsForTownFailure,
  getMediaChannelsForTownSuccess,
  getProductsFailure,
  getProductsSuccess,
  getProfileFailure,
  getProfileSuccess,
  getTownsFailure,
  getTownsSuccess,
  getUserAssetsProperties,
  getUserAssetsPropertiesFailure,
  getUserAssetsPropertiesSuccess,
  getUserConsentsFailure,
  getUserConsentsSuccess,
  getUserPurchasesAggregatedFailure,
  getUserPurchasesAggregatedSuccess,
  getUserSettingsFailure,
  getUserSettingsSuccess,
  reactivateSubscriptionFailure,
  reactivateSubscriptionSuccess,
  searchUserAssetPurchasesFailure,
  searchUserAssetPurchasesSuccess,
  updateProfileFailure,
  updateProfileSuccess,
  updateUserConsentFailure,
  updateUserConsentsFailure,
  updateUserConsentsSuccess,
  updateUserConsentSuccess,
  updateUserSettingsFailure,
  updateUserSettingsSuccess,
} from "./actions";
import * as Consts from "./consts";
import {
  ICancelSubscriptionAction,
  IChangeSubscriptionPaymentMethodAction,
  IDeleteAccountAction,
  IDeleteAccountSuccessAction,
  IGetMediaChannelsForTownAction,
  IGetProductsAction,
  IGetProfileAction,
  IGetTownsAction,
  IGetUserAssetsPropertiesAction,
  IGetUserAssetsPropertiesSuccessAction,
  IGetUserConsentsAction,
  IGetUserPurchasesAggregatedAction,
  IGetUserSettingsAction,
  IReactivateSubscriptionAction,
  ISearchUserAssetPurchasesAction,
  IUpdateProfileAction,
  IUpdateProfileSuccessAction,
  IUpdateUserConsentAction,
  IUpdateUserConsentsAction,
  IUpdateUserSettingsAction,
} from "./types";

const storageService: StorageService = StorageService.getInstance();

const getProfileEpic = (action$: ActionsObservable<IGetProfileAction>) =>
  action$.pipe(
    ofType(Consts.GET_PROFILE),
    switchMap(() =>
      DataProvider.getProfile({
        IncludeUploadFilesInfo: true,
      })
        .then((data: IUserModel) => getProfileSuccess(data as IUserModel))
        .catch((error: IErrorModel) => getProfileFailure(error))
    )
  );

const updateProfileEpic = (action$: ActionsObservable<IUpdateProfileAction>) =>
  action$.pipe(
    ofType(Consts.UPDATE_PROFILE),
    switchMap((action: IUpdateProfileAction) => {
      const filesToUpload: Array<
        Promise<OperationResult<UploadFileInfoModel>>
      > = [];

      if (action.payload.AvatarUploadInfo) {
        if (action.payload.AvatarFile) {
          action.payload.AvatarUploadInfo.Key = "AvatarFile";
          filesToUpload.push(
            storageService.uploadFile(
              action.payload.AvatarFile,
              action.payload.AvatarUploadInfo
            )
          );
        } else {
          action.payload.AvatarUploadInfo = undefined;
        }
      }

      return Promise.all(filesToUpload)
        .then(
          (uploadFilesInfo: Array<OperationResult<UploadFileInfoModel>>) => {
            if (uploadFilesInfo && uploadFilesInfo.length > 0) {
              for (const uploadFileInfo of uploadFilesInfo) {
                if (
                  uploadFileInfo.ResultType === OperationResultType.Ok &&
                  uploadFileInfo.Result
                ) {
                  switch (uploadFileInfo.Result.Key) {
                    case "AvatarFile":
                      action.payload.AvatarPath = uploadFileInfo.Result.Path;
                      action.payload.AvatarFile = undefined;
                      action.payload.AvatarUploadInfo = undefined;

                      break;
                  }
                }
              }
            }

            return;
          }
        )
        .then(() =>
          DataProvider.updateProfile(action.payload as IUserModel)
            .then((data) => updateProfileSuccess(data as IUserModel))
            .catch((error: IErrorModel) => updateProfileFailure(error))
        )
        .catch((error: IErrorModel) => {
          return updateProfileFailure(error);
        });
    })
  );

const deleteAccountEpic = (action$: ActionsObservable<IDeleteAccountAction>) =>
  action$.pipe(
    ofType(Consts.DELETE_ACCOUNT),
    switchMap((action: IDeleteAccountAction) =>
      DataProvider.deleteAccount(action.payload)
        .then(() => deleteAccountSuccess())
        .catch((error: IErrorModel) => deleteAccountFailure(error))
    )
  );

const deleteAccountSuccessEpic = (
  action$: ActionsObservable<IDeleteAccountSuccessAction>
) =>
  action$.pipe(
    ofType(Consts.DELETE_ACCOUNT_SUCCESS),
    switchMap(async () => {
      try {
        await StorageHelper.deleteUser();
        await StorageManager.deleteValue("session");
        clearHistory();
        return replace(ROUTES.DELETE_ACCOUNT_SUCCESS);
      } catch (error) {
        return EMPTY;
      }
    })
  );

const signInSuccessEpic = (
  action$: ActionsObservable<AuthStore.Types.ISignInSuccessAction>
) =>
  action$.pipe(
    ofType(AuthStore.Consts.SIGN_IN_SUCCESS),
    switchMap((action: AuthStore.Types.ISignInSuccessAction) => {
      if (action.payload.user?.Id) {
        return of(getUserAssetsProperties());
      } else {
        return EMPTY;
      }
    })
  );

const getUserAssetsPropertiesEpic = (
  action$: ActionsObservable<IGetUserAssetsPropertiesAction>
) =>
  action$.pipe(
    ofType(Consts.GET_USER_ASSETS_PROPERTIES),
    switchMap(async () => {
      try {
        const userAssetsProperties =
          await DataProvider.getUserAssetsProperties();
        return getUserAssetsPropertiesSuccess(userAssetsProperties);
      } catch (err) {
        return getUserAssetsPropertiesFailure(err as IErrorModel);
      }
    })
  );

const getUserAssetsPropertiesSuccessEpic = (
  action$: ActionsObservable<IGetUserAssetsPropertiesSuccessAction>,
  state: StateObservable<IAppState>
) =>
  action$.pipe(
    ofType(Consts.GET_USER_ASSETS_PROPERTIES_SUCCESS),
    switchMap(async (action: IGetUserAssetsPropertiesSuccessAction) => {
      await StorageHelper.setUserAssetsProperties(action.payload);
      const router = state.value.router;
      return router
        ? replace(
            router?.location.pathname + router?.location.search,
            router.location.state
          )
        : go(0);
    })
  );

const updateProfileSuccessEpic = (
  action$: ActionsObservable<IUpdateProfileSuccessAction>
) =>
  action$.pipe(
    ofType(Consts.UPDATE_PROFILE_SUCCESS),
    switchMap((action: IUpdateProfileSuccessAction) => {
      return of(refreshUser(action.payload));
    })
  );

const getUserConsentsEpic = (
  action$: ActionsObservable<IGetUserConsentsAction>
) =>
  action$.pipe(
    ofType(Consts.GET_USER_CONSENTS),
    switchMap(() =>
      DataProvider.selectUserConsents()
        .then((data) => getUserConsentsSuccess(data))
        .catch((error: IErrorModel) => getUserConsentsFailure(error))
    )
  );

const updateUserConsentEpic = (
  action$: ActionsObservable<IUpdateUserConsentAction>
) =>
  action$.pipe(
    ofType(Consts.UPDATE_USER_CONSENT),
    switchMap((action: IUpdateUserConsentAction) =>
      DataProvider.updateUserConsent(action.payload)
        .then((data: IUserConsentModel) => updateUserConsentSuccess(data))
        .catch((error: IErrorModel) => updateUserConsentFailure(error))
    )
  );

const updateUserConsentsEpic = (
  action$: ActionsObservable<IUpdateUserConsentsAction>
) =>
  action$.pipe(
    ofType(Consts.UPDATE_USER_CONSENTS),
    switchMap((action: IUpdateUserConsentsAction) =>
      DataProvider.updateUserConsents(action.payload)
        .then((data: IUserConsentModel[]) => updateUserConsentsSuccess(data))
        .catch((error: IErrorModel) => updateUserConsentsFailure(error))
    )
  );

const getProductsEpic = (action$: ActionsObservable<IGetProductsAction>) =>
  action$.pipe(
    ofType(Consts.GET_PRODUCTS),
    switchMap(() =>
      DataProvider.getProducts()
        .then((data: IUserProductModel[]) => {
          return StorageHelper.getUser()
            .then((user: IUserInfoModel) => {
              user.Products = data;

              return StorageHelper.setUser(user).then(() => {
                return getProductsSuccess(data);
              });
            })
            .catch((error) => {
              return getProductsFailure(error);
            });
        })
        .catch((error: IErrorModel) => getProductsFailure(error))
    )
  );

const cancelSubscriptionEpic = (
  action$: ActionsObservable<ICancelSubscriptionAction>
) =>
  action$.pipe(
    ofType(Consts.CANCEL_SUBSCRIPTION),
    switchMap((action: ICancelSubscriptionAction) =>
      DataProvider.cancelSubscription(action.userSubscriptionId)
        .then((response) => {
          action?.meta?.onSuccess?.(response);
          return cancelSubscriptionSuccess(action.userSubscriptionId);
        })
        .catch((error: IErrorModel) => {
          action?.meta?.onFailure?.(error);
          return cancelSubscriptionFailure(action.userSubscriptionId, error);
        })
    )
  );

const reactivateSubscriptionEpic = (
  action$: ActionsObservable<IReactivateSubscriptionAction>
) =>
  action$.pipe(
    ofType(Consts.REACTIVATE_SUBSCRIPTION),
    switchMap((action: IReactivateSubscriptionAction) =>
      DataProvider.reactivateSubscription(action.userSubscriptionId)
        .then((response) => {
          action?.meta?.onSuccess?.(response);
          return reactivateSubscriptionSuccess(action.userSubscriptionId);
        })
        .catch((error: IErrorModel) => {
          action?.meta?.onFailure?.(error);
          return reactivateSubscriptionFailure(
            action.userSubscriptionId,
            error
          );
        })
    )
  );

const searchUserAssetPurchasesEpic = (
  action$: ActionsObservable<ISearchUserAssetPurchasesAction>
) =>
  action$.pipe(
    ofType(Consts.SEARCH_USER_ASSET_PURCHASES),
    switchMap((action) =>
      DataProvider.searchUserAssetPurchases(action.filter)
        .then((data) => {
          data.Filter = action.filter;
          return searchUserAssetPurchasesSuccess(data);
        })
        .catch((error: IErrorModel) => searchUserAssetPurchasesFailure(error))
    )
  );

const getUserPurchasesAggregatedEpic = (
  action$: ActionsObservable<IGetUserPurchasesAggregatedAction>
) =>
  action$.pipe(
    ofType(Consts.GET_USER_PURCHASES_AGGREGATED),
    switchMap(() =>
      DataProvider.getUserPurchasesAggregated()
        .then((data) => {
          return getUserPurchasesAggregatedSuccess(data);
        })
        .catch((error: IErrorModel) => getUserPurchasesAggregatedFailure(error))
    )
  );

const changePaymentSubscriptionEpic = (
  action$: ActionsObservable<IChangeSubscriptionPaymentMethodAction>
) =>
  action$.pipe(
    ofType(Consts.CHANGE_SUBSCRIPTION_PAYMENT_METHOD),
    switchMap((action: IChangeSubscriptionPaymentMethodAction) =>
      DataProvider.changeSubscriptionPaymentMethod(action.userSubscriptionId)
        .then((result) => {
          return DataProvider.getPaymentTypeMappingAndOptions()
            .then((providers) => {
              const option = providers.Options.find(
                (o) => o.Provider === action.paymentProvider
              );
              if (option) {
                return definePaymentProvider(option);
              } else {
                return Promise.reject(
                  "Cannot handle payment provider for that subscription."
                );
              }
            })
            .then(() => PaymentProvider.init())
            .then(() =>
              PaymentProvider.checkout({
                SessionId: result.PaymentId,
                RedirectUrl: result.RedirectUrl,
              })
            )
            .then(() =>
              reactivateSubscriptionSuccess(action.userSubscriptionId)
            );
        })
        .catch((error: IErrorModel) =>
          reactivateSubscriptionFailure(action.userSubscriptionId, error)
        )
    )
  );

const getTownsEpic = (action$: ActionsObservable<IGetTownsAction>) =>
  action$.pipe(
    ofType(Consts.GET_TOWNS),
    switchMap((_action: IGetTownsAction) =>
      DataProvider.getTowns()
        .then((data: ITownsListModel) => {
          return getTownsSuccess(data);
        })
        .catch((error) => {
          return getTownsFailure(error);
        })
    )
  );

const getUserSettings = (action$: ActionsObservable<IGetUserSettingsAction>) =>
  action$.pipe(
    ofType(Consts.GET_USER_SETTINGS),
    switchMap((_action: IGetUserSettingsAction) =>
      DataProvider.getUserSettings()
        .then((data: IUserSettingsModel) => {
          return getUserSettingsSuccess(data);
        })
        .catch((error) => {
          return getUserSettingsFailure(error);
        })
    )
  );

const updateUserSettings = (
  action$: ActionsObservable<IUpdateUserSettingsAction>
) =>
  action$.pipe(
    ofType(Consts.UPDATE_USER_SETTINGS),
    switchMap((action: IUpdateUserSettingsAction) =>
      DataProvider.updateUserSettings(action.payload)
        .then((data: IUserSettingsModel) => updateUserSettingsSuccess(data))
        .catch((error: IErrorModel) => updateUserSettingsFailure(error))
    )
  );

export const getMediaChannelsForTownEpic = (
  action$: ActionsObservable<IGetMediaChannelsForTownAction>
) =>
  action$.pipe(
    ofType(Consts.GET_MEDIA_CHANNELS_FOR_TOWN),
    switchMap(async (action: IGetMediaChannelsForTownAction) => {
      return DataProvider.getMediaChannelsForTown(
        action.townId,
        action.onGoingNow
      )
        .then((data) => getMediaChannelsForTownSuccess(data))
        .catch((error) => getMediaChannelsForTownFailure(error));
    })
  );

export const userEpics = [
  signInSuccessEpic,
  getUserAssetsPropertiesEpic,
  getProfileEpic,
  updateProfileEpic,
  updateProfileSuccessEpic,
  deleteAccountEpic,
  deleteAccountSuccessEpic,
  getUserAssetsPropertiesSuccessEpic,
  getUserConsentsEpic,
  updateUserConsentEpic,
  updateUserConsentsEpic,
  getProductsEpic,
  cancelSubscriptionEpic,
  reactivateSubscriptionEpic,
  searchUserAssetPurchasesEpic,
  getUserPurchasesAggregatedEpic,
  changePaymentSubscriptionEpic,
  getTownsEpic,
  getUserSettings,
  updateUserSettings,
  getMediaChannelsForTownEpic,
];
