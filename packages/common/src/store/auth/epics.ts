/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { push, replace } from "connected-react-router";
import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import { filter, map, mapTo, switchMap } from "rxjs/operators";

import { ROUTES } from "../../constants";
import { AuthResult } from "../../enums";
import { DeviceHelper, StorageHelper } from "../../helpers";
import {
  IAuthResponseModel,
  IErrorModel,
  isFieldError,
  IUserDeviceModel,
  IUserInfoModel,
  stringToErrorModel,
} from "../../models";
import { DataProvider } from "../../providers/DataProvider";
import { StorageManager } from "../../services";
import { Actions as MediaActions } from "../media";
import { IAppState } from "../types";

import * as Actions from "./actions";
import * as Consts from "./consts";
import * as Types from "./types";

export const signInEpic = (action$: ActionsObservable<Types.ISignInAction>) =>
  action$.pipe(
    ofType(Consts.SIGN_IN),
    switchMap(async (action: Types.ISignInAction) => {
      try {
        const device = await DeviceHelper.getDeviceInfo();
        const payload = { ...action.data };

        if (!payload.Device) {
          payload.Device = device;
        }

        const response = await DataProvider.signIn(payload);
        if (response.User?.Id === 0) {
          return Actions.signInFailure();
        }

        await StorageHelper.setUser(response.User, response.DidomiData);
        await StorageManager.setValue("session", response.AuthorizationToken);
        await StorageManager.deleteValue("channels");
        return Actions.signInSuccess(
          response.User,
          response.AuthorizationToken,
          response.DidomiData
        );
      } catch (error) {
        return Actions.signInFailure(error as IErrorModel);
      }
    })
  );

const signInSuccessEpic = (
  action$: ActionsObservable<Types.ISignInSuccessAction>,
  state: StateObservable<IAppState>
) =>
  action$.pipe(
    ofType(Consts.SIGN_IN_SUCCESS),
    map(() => {
      const from = state?.value.router?.location?.state?.from || ROUTES.BASE;
      return push(from !== ROUTES.BASE ? from : ROUTES.HOME);
    })
  );

export const signInAnonymousEpic = (
  action$: ActionsObservable<Types.ISignInAnonymousAction>
) =>
  action$.pipe(
    ofType(Consts.SIGN_IN_ANONYMOUS),
    switchMap((action: Types.ISignInAnonymousAction) =>
      DeviceHelper.getDeviceInfo()
        .then((deviceInfo: IUserDeviceModel) => {
          const payload = { ...action.data };

          if (!payload.Device) {
            payload.Device = deviceInfo;
          }

          return DataProvider.signIn(payload);
        })
        .then((response: IAuthResponseModel) => {
          return Actions.signInAnonymousSuccess(
            response.User,
            response.AuthorizationToken,
            response.DidomiData
          );
        })
        .catch((error: IErrorModel) => {
          return Actions.signInAnonymousFailure(error);
        })
    )
  );

const signInAnonymousSuccessEpic = (
  action$: ActionsObservable<Types.ISignInAnonymousSuccessAction>
) =>
  action$.pipe(
    ofType(Consts.SIGN_IN_ANONYMOUS_SUCCESS),
    switchMap((action: Types.ISignInAnonymousSuccessAction) => {
      return StorageHelper.setUser(
        action.payload.user,
        action.payload.didomiData
      ).then(() => {
        return StorageManager.setValue("session", action.payload.session).then(
          () => Actions.setAuthenticated()
        );
      });
    })
  );

const refreshUserEpic = (
  action$: ActionsObservable<Types.IRefreshUserAction>
) =>
  action$.pipe(
    ofType(Consts.REFRESH_USER),
    switchMap((action: Types.IRefreshUserAction) => {
      return StorageHelper.getUser()
        .then((user: IUserInfoModel) => {
          user.AvatarUrl = action.payload.AvatarUrl;
          user.FullName = action.payload.FullName;

          return StorageHelper.setUser(user).then(() => {
            return { type: "NEVER" };
          });
        })
        .catch(() => {
          return { type: "NEVER" };
        });
    })
  );

const syncUserEpic = (action$: ActionsObservable<Types.ISyncUserAction>) =>
  action$.pipe(
    ofType(Consts.SYNC_USER),
    switchMap(() => StorageHelper.getUser()),
    map((userInfo: IUserInfoModel) =>
      userInfo ? Actions.syncUserSuccess(userInfo) : Actions.syncUserFailure()
    )
  );

const signOutEpic = (action$: ActionsObservable<Types.ISignOutAction>) =>
  action$.pipe(
    ofType(Consts.SIGN_OUT),
    switchMap(async ({ redirectUrl }: Types.ISignOutAction) => {
      try {
        const device = await DeviceHelper.getDeviceInfo();
        await DataProvider.signOut(device);
        await StorageHelper.deleteUser();
        await StorageManager.deleteValue("session");
        await StorageManager.deleteValue("channels");
        //anonymous session
        const { User, DidomiData, AuthorizationToken } =
          await DataProvider.signIn({
            Device: device,
          });
        await StorageHelper.setUser(User, DidomiData);
        await StorageManager.setValue("session", AuthorizationToken);
        const user = { ...User, DidomiData };

        return Actions.signOutSuccess(redirectUrl, user as IUserInfoModel);
      } catch (error) {
        return Actions.signOutFailure(error as IErrorModel);
      }
    })
  );

const registerEmailEpic = (
  action$: ActionsObservable<Types.IRegisterEmailAction>
) =>
  action$.pipe(
    ofType(Consts.REGISTER_EMAIL),
    switchMap((action: Types.IRegisterEmailAction) =>
      DataProvider.registerEmail(action.data)
        .then(() =>
          Actions.registerEmailSuccess(action.data.Email, action.redirectUrl)
        )
        .catch((error: IErrorModel) =>
          Actions.registerEmailFailure(
            error,
            action.data.Email,
            action.redirectUrl
          )
        )
    )
  );

const registerConfirmEmailEpic = (
  action$: ActionsObservable<Types.IRegisterConfirmEmailAction>
) =>
  action$.pipe(
    ofType(Consts.REGISTER_CONFIRM_EMAIL),
    switchMap((action: Types.IRegisterConfirmEmailAction) =>
      DataProvider.registerConfirmEmail(action.data)
        .then((response) =>
          Actions.registerConfirmEmailSuccess(
            response.User,
            response.AuthorizationToken,
            action.redirectUrl
          )
        )
        .catch((error: string) =>
          Actions.registerConfirmEmailFailure(stringToErrorModel(error))
        )
    )
  );

export const registerConfirmAccountWithPasswordEpic = (
  action$: ActionsObservable<Types.IConfirmAccountWithPasswordAction>
) =>
  action$.pipe(
    ofType(Consts.CONFIRM_ACCOUNT_WITH_PASSWORD),
    switchMap((action: Types.IConfirmAccountWithPasswordAction) =>
      DataProvider.registerConfirmAccount(action.data)
        .then((response) =>
          Actions.registerConfirmEmailSuccess(
            response.User,
            response.AuthorizationToken,
            action.redirectUrl
          )
        )
        .catch((error: string) =>
          Actions.registerConfirmEmailFailure(stringToErrorModel(error))
        )
    )
  );

export const refreshTokenEpic = (
  action$: ActionsObservable<Types.IRefreshTokenAction>,
  state: StateObservable<IAppState>
) => {
  return action$.pipe(
    ofType(Consts.REFRESH_TOKEN),
    switchMap(() => {
      const token = state.value.auth.session?.RefreshToken as string;

      return DeviceHelper.getDeviceInfo()
        .then((deviceInfo: IUserDeviceModel) => {
          return DataProvider.refreshToken(token, deviceInfo);
        })
        .then((response: IAuthResponseModel) => {
          if (
            response.AuthorizationToken &&
            response.AuthorizationToken.AuthResult === AuthResult.OK
          ) {
            return Actions.refreshTokenSuccess(
              response.AuthorizationToken,
              response.User
            );
          }
          return Actions.refreshTokenFailure();
        })
        .catch(() => {
          return Actions.refreshTokenFailure();
        });
    })
  );
};

const refreshTokenSuccessEpic = (
  action$: ActionsObservable<Types.IRefreshTokenSuccessAction>
) =>
  action$.pipe(
    ofType(Consts.REFRESH_TOKEN_SUCCESS),
    switchMap((action: Types.IRefreshTokenSuccessAction) => {
      return StorageHelper.setUser(action.payload.user).then(() => {
        return StorageManager.setValue("session", action.payload.session).then(
          () => {
            return { type: "NEVER" };
          }
        );
      });
    })
  );

const refreshTokenFailureEpic = (
  action$: ActionsObservable<Types.IRefreshTokenFailureAction>
) =>
  action$.pipe(
    ofType(Consts.REFRESH_TOKEN_FAILURE),
    map((_action: Types.IRefreshTokenFailureAction) => {
      return StorageHelper.deleteUser().then(() => {
        return StorageManager.deleteValue("session");
      });
    }),
    mapTo(push(ROUTES.BASE))
  );

export const changePasswordEpic = (
  action$: ActionsObservable<Types.IChangePasswordAction>
) =>
  action$.pipe(
    ofType(Consts.CHANGE_PASSWORD),
    switchMap((action: Types.IChangePasswordAction) =>
      DataProvider.changePassword(action.payload)
        .then((data) => Actions.changePasswordSuccess(data))
        .catch((error: IErrorModel) => Actions.changePasswordFailure(error))
    )
  );

const forgotPasswordFailureEpic = (
  action$: ActionsObservable<Types.IForgotPasswordFailureAction>
) =>
  action$.pipe(
    ofType(Consts.RESET_PASSWORD_LINK_FAILURE),
    map((action: Types.IResetPasswordLinkFailureAction) =>
      replace({
        pathname: ROUTES.FORGOT_PASSWORD_SUCCESS,
        state: { email: action.email },
      })
    )
  );

const registerConfirmEmailSuccessEpic = (
  action$: ActionsObservable<Types.IRegisterConfirmEmailSuccessAction>
) =>
  action$.pipe(
    ofType(Consts.REGISTER_CONFIRM_EMAIL_SUCCESS),
    switchMap(async (action: Types.IRegisterConfirmEmailSuccessAction) => {
      const redirectUrl = ROUTES.HOME;
      const user = action.payload.user;
      const session = action.payload.session;

      try {
        if (session) {
          await StorageManager.setValue("session", session);
        }

        if (user) {
          await StorageHelper.setUser(user);

          const products = await DataProvider.getProducts();

          if (products) {
            user.Products = products;
            await StorageHelper.setUser(user);
          }
        }

        if (action.payload.redirectUrl) {
          if (action.payload.redirectUrl.includes(location.origin)) {
            return replace(new URL(action.payload.redirectUrl).pathname);
          }
          return window.location.replace(action.payload.redirectUrl);
        }

        return replace(redirectUrl);
      } catch (error) {
        console.error(error);
        return replace(redirectUrl);
      }
    })
  );

export const validateTokenEpic = (
  action$: ActionsObservable<Types.IValidateTokenAction>
) =>
  action$.pipe(
    ofType(Consts.VALIDATE_TOKEN),
    switchMap((action: Types.IValidateTokenAction) =>
      DataProvider.validateConfirmationToken(action.payload.token)
        .then(() => Actions.validateTokenSuccess())
        .catch((error: IErrorModel) => Actions.validateTokenFailure(error))
    )
  );

const forgotPasswordEpic = (
  action$: ActionsObservable<Types.IForgotPasswordAction>
) =>
  action$.pipe(
    ofType(Consts.RESET_PASSWORD_LINK),
    switchMap((action: Types.IForgotPasswordAction) =>
      DataProvider.forgotPassword(action.payload)
        .then((response) => Actions.forgotPasswordSuccess(response))
        .catch((error: IErrorModel) =>
          Actions.forgotPasswordFailure(error, action.payload.Email)
        )
    )
  );

const resetForgotPasswordEpic = (
  action$: ActionsObservable<Types.IResetForgotPasswordAction>
) =>
  action$.pipe(
    ofType(Consts.RESET_PASSWORD),
    switchMap((action: Types.IResetForgotPasswordAction) =>
      DataProvider.resetForgotPassword(action.payload)
        .then((response) => Actions.resetForgotPasswordSuccess(response))
        .catch((error: IErrorModel) =>
          Actions.resetForgotPasswordFailure(error)
        )
    )
  );

export const registerEmailSuccessRedirectEpic = (
  action$: ActionsObservable<Types.IRegisterEmailSuccessAction>
) =>
  action$.pipe(
    ofType(Consts.REGISTER_EMAIL_SUCCESS),
    map((action: Types.IRegisterEmailSuccessAction) => {
      return push({
        pathname: action.payload.redirectUrl || ROUTES.REGISTER_SUCCESS,
        state: { email: action.payload.email },
      });
    })
  );

export const registerEmailFailureRedirectEpic = (
  action$: ActionsObservable<Types.IRegisterEmailFailureAction>
) =>
  action$.pipe(
    ofType(Consts.REGISTER_EMAIL_FAILURE),
    filter(
      (action: Types.IRegisterEmailFailureAction) =>
        action.error?.MessageKey === "INVALID_EMAIL_NOT_UNIQUE"
    ),
    map((action: Types.IRegisterEmailFailureAction) => {
      return push({
        pathname: action.payload.redirectUrl || ROUTES.REGISTER_SUCCESS,
        state: { email: action.payload.email },
      });
    })
  );

export const resetPasswordLinkSuccessEpic = (
  action$: ActionsObservable<Types.IResetPasswordLinkSuccessAction>
) =>
  action$.pipe(
    ofType(Consts.RESET_PASSWORD_LINK_SUCCESS),
    mapTo(replace(ROUTES.FORGOT_PASSWORD_SUCCESS))
  );

export const resetPasswordLinkFailureEpic = (
  action$: ActionsObservable<Types.IResetPasswordLinkFailureAction>
) =>
  action$.pipe(
    ofType(Consts.RESET_PASSWORD_LINK_FAILURE),
    filter((action: Types.IResetPasswordLinkFailureAction) =>
      action.error ? !isFieldError(action.error) : true
    ),
    map((action: Types.IResetPasswordLinkFailureAction) =>
      replace({
        pathname: ROUTES.FORGOT_PASSWORD_SUCCESS,
        state: { email: action.email },
      })
    )
  );

export const resetPasswordSuccessEpic = (
  action$: ActionsObservable<Types.IResetPasswordSuccessAction>
) => action$.pipe(ofType(Consts.RESET_PASSWORD_SUCCESS), mapTo(push("/login")));

export const resendConfirmationEmailByUserEpic = (
  action$: ActionsObservable<Types.IResendConfirmationEmailByUserAction>
) =>
  action$.pipe(
    ofType(Consts.RESEND_CONFIRMATION_EMAIL_BY_USER),
    switchMap((action: Types.IResendConfirmationEmailByUserAction) =>
      DataProvider.resendConfirmationEmailByUser(action.data)
        .then(() => Actions.resendConfirmationEmailByUserSuccess())
        .catch(() => Actions.resendConfirmationEmailByUserFailure())
    )
  );

const resendConfirmationEmailByUserSuccessEpic = (
  action$: ActionsObservable<Types.IResendConfirmationEmailByUserSuccessAction>
) =>
  action$.pipe(
    ofType(Consts.RESEND_CONFIRMATION_EMAIL_BY_USER_SUCCESS),
    mapTo(replace(ROUTES.RESEND_CONFIRMATION_SUCCESS))
  );

const signOutSuccessRedirectEpic = (
  action$: ActionsObservable<Types.ISignOutSuccessAction>
) =>
  action$.pipe(
    ofType(Consts.SIGN_OUT_SUCCESS),
    map(({ redirectUrl }: Types.ISignOutSuccessAction) =>
      replace(redirectUrl || ROUTES.LOGIN)
    )
  );

const signOutSuccessClearMediaEpic = (
  action$: ActionsObservable<Types.ISignOutSuccessAction>
) =>
  action$.pipe(
    ofType(Consts.SIGN_OUT_SUCCESS),
    switchMap(async () => {
      await StorageManager.deleteValue("source")
        .then(() => StorageManager.getValue("users"))
        .then((users) => {
          const anonymous = users["-999"];
          return { "-999": anonymous };
        })
        .then((newUsers) => {
          return StorageManager.setValue("users", newUsers);
        });
      return MediaActions.clearMedia();
    })
  );

export const authEpics = [
  syncUserEpic,
  signInEpic,
  signInSuccessEpic,
  signInAnonymousEpic,
  signInAnonymousSuccessEpic,
  signOutEpic,
  signOutSuccessRedirectEpic,
  registerEmailEpic,
  registerEmailSuccessRedirectEpic,
  registerEmailFailureRedirectEpic,
  registerConfirmEmailEpic,
  registerConfirmAccountWithPasswordEpic,
  registerConfirmEmailSuccessEpic,
  refreshTokenEpic,
  refreshTokenSuccessEpic,
  refreshTokenFailureEpic,
  changePasswordEpic,
  refreshUserEpic,
  validateTokenEpic,
  resetForgotPasswordEpic,
  resetPasswordLinkSuccessEpic,
  resetPasswordLinkFailureEpic,
  resetPasswordSuccessEpic,
  forgotPasswordEpic,
  forgotPasswordFailureEpic,
  resendConfirmationEmailByUserEpic,
  resendConfirmationEmailByUserSuccessEpic,
  signOutSuccessClearMediaEpic,
];
