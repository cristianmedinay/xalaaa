/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IAuthRequestModel,
  IAuthResponseModel,
  IChangePasswordModel,
  IConfirmAccountWithPasswordModel,
  IDidomiDataModel,
  IErrorModel,
  IForgotPasswordModel,
  IRegisterConfirmEmailModel,
  IRegisterRequestEmailModel,
  IResetForgotPasswordModel,
  ITokenModel,
  IUserInfoModel,
  IUserModel,
} from "../../models";
import { IResendConfirmationByUserModel } from "../../providers/DataProvider/Internal/models";

import * as Consts from "./consts";
import {
  IChangePasswordAction,
  IChangePasswordFailureAction,
  IChangePasswordSuccessAction,
  IConfirmAccountWithPasswordAction,
  IForgotPasswordAction,
  IForgotPasswordFailureAction,
  IForgotPasswordSuccessAction,
  IRefreshTokenFailureAction,
  IRefreshTokenSuccessAction,
  IRefreshUserAction,
  IRegisterConfirmEmailAction,
  IRegisterConfirmEmailFailureAction,
  IRegisterConfirmEmailSuccessAction,
  IRegisterEmailAction,
  IRegisterEmailFailureAction,
  IRegisterEmailSuccessAction,
  IResendConfirmationEmailByUserAction,
  IResendConfirmationEmailByUserFailureAction,
  IResendConfirmationEmailByUserSuccessAction,
  IResetForgotPasswordAction,
  IResetForgotPasswordFailureAction,
  IResetForgotPasswordSuccessAction,
  ISetAuthenticatedAction,
  ISignInAction,
  ISignInAnonymousAction,
  ISignInAnonymousFailureAction,
  ISignInAnonymousSuccessAction,
  ISignInFailureAction,
  ISignInSuccessAction,
  ISignOutAction,
  ISignOutFailureAction,
  ISignOutSuccessAction,
  ISyncUserAction,
  ISyncUserFailureAction,
  ISyncUserSuccessAction,
  IValidateTokenAction,
  IValidateTokenFailureAction,
  IValidateTokenSuccessAction,
} from "./types";

export const signIn = (data: IAuthRequestModel): ISignInAction => {
  return {
    data,
    type: Consts.SIGN_IN,
  };
};
export const signInSuccess = (
  user?: IUserInfoModel,
  session?: ITokenModel,
  didomiData?: IDidomiDataModel
): ISignInSuccessAction => {
  return {
    payload: {
      session,
      user,
      didomiData,
    },
    type: Consts.SIGN_IN_SUCCESS,
  };
};

export const signInFailure = (error?: IErrorModel): ISignInFailureAction => {
  return {
    error,
    type: Consts.SIGN_IN_FAILURE,
  };
};

export const signInAnonymous = (
  data: IAuthRequestModel = {}
): ISignInAnonymousAction => {
  return {
    data,
    type: Consts.SIGN_IN_ANONYMOUS,
  };
};

export const signInAnonymousSuccess = (
  user?: IUserInfoModel,
  session?: ITokenModel,
  didomiData?: IDidomiDataModel
): ISignInAnonymousSuccessAction => {
  return {
    payload: {
      session,
      user,
      didomiData,
    },
    type: Consts.SIGN_IN_ANONYMOUS_SUCCESS,
  };
};

export const signInAnonymousFailure = (
  error?: IErrorModel
): ISignInAnonymousFailureAction => {
  return {
    error,
    type: Consts.SIGN_IN_ANONYMOUS_FAILURE,
  };
};

export const signOut = (redirectUrl?: string): ISignOutAction => {
  return {
    redirectUrl,
    type: Consts.SIGN_OUT,
  };
};

export const signOutSuccess = (
  redirectUrl?: string,
  anonymousUser?: IUserInfoModel
): ISignOutSuccessAction => {
  return {
    redirectUrl,
    anonymousUser,
    type: Consts.SIGN_OUT_SUCCESS,
  };
};

export const signOutFailure = (error?: IErrorModel): ISignOutFailureAction => {
  return {
    error,
    type: Consts.SIGN_OUT_FAILURE,
  };
};

export const setAuthenticated = (): ISetAuthenticatedAction => {
  return {
    type: Consts.SET_AUTHENTICATED,
  };
};

export const refreshUser = (data: IUserModel): IRefreshUserAction => {
  return {
    payload: data,
    type: Consts.REFRESH_USER,
  };
};

export const syncUser = (): ISyncUserAction => {
  return {
    type: Consts.SYNC_USER,
  };
};

export const syncUserSuccess = (
  data: IUserInfoModel
): ISyncUserSuccessAction => {
  return {
    type: Consts.SYNC_USER_SUCCESS,
    payload: data,
  };
};

export const syncUserFailure = (): ISyncUserFailureAction => {
  return {
    type: Consts.SYNC_USER_FAILURE,
  };
};

export const refreshTokenFailure = (): IRefreshTokenFailureAction => {
  return {
    type: Consts.REFRESH_TOKEN_FAILURE,
  };
};

export const refreshTokenSuccess = (
  session: ITokenModel,
  user?: IUserInfoModel
): IRefreshTokenSuccessAction => {
  return {
    payload: {
      session,
      user,
    },
    type: Consts.REFRESH_TOKEN_SUCCESS,
  };
};

export const changePassword = (
  data: IChangePasswordModel
): IChangePasswordAction => {
  return {
    payload: data,
    type: Consts.CHANGE_PASSWORD,
  };
};

export const changePasswordSuccess = (
  data: IAuthResponseModel
): IChangePasswordSuccessAction => {
  return {
    payload: data,
    type: Consts.CHANGE_PASSWORD_SUCCESS,
  };
};

export const changePasswordFailure = (
  error?: IErrorModel
): IChangePasswordFailureAction => {
  return {
    error,
    type: Consts.CHANGE_PASSWORD_FAILURE,
  };
};

export const forgotPassword = (
  data: IForgotPasswordModel
): IForgotPasswordAction => {
  return {
    type: Consts.RESET_PASSWORD_LINK,
    payload: data,
  };
};

export const forgotPasswordSuccess = (
  data: boolean
): IForgotPasswordSuccessAction => {
  return {
    type: Consts.RESET_PASSWORD_LINK_SUCCESS,
    payload: data,
  };
};

export const forgotPasswordFailure = (
  error: IErrorModel,
  email?: string
): IForgotPasswordFailureAction => {
  return {
    type: Consts.RESET_PASSWORD_LINK_FAILURE,
    error,
    email,
  };
};

export const resetForgotPassword = (
  data: IResetForgotPasswordModel
): IResetForgotPasswordAction => {
  return {
    type: Consts.RESET_PASSWORD,
    payload: data,
  };
};

export const resetForgotPasswordSuccess = (
  data: boolean
): IResetForgotPasswordSuccessAction => {
  return {
    type: Consts.RESET_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const resetForgotPasswordFailure = (
  error?: IErrorModel
): IResetForgotPasswordFailureAction => {
  return {
    type: Consts.RESET_PASSWORD_FAILURE,
    error,
  };
};

export const validateToken = (token: string): IValidateTokenAction => {
  return {
    type: Consts.VALIDATE_TOKEN,
    payload: {
      token,
    },
  };
};

export const validateTokenSuccess = (): IValidateTokenSuccessAction => {
  return {
    type: Consts.VALIDATE_TOKEN_SUCCESS,
  };
};

export const validateTokenFailure = (
  error: IErrorModel
): IValidateTokenFailureAction => {
  return {
    type: Consts.VALIDATE_TOKEN_FAILURE,
    error,
  };
};

export const registerEmail = (
  data: IRegisterRequestEmailModel,
  redirectUrl?: string
): IRegisterEmailAction => {
  return {
    data,
    redirectUrl,
    type: Consts.REGISTER_EMAIL,
  };
};

export const registerEmailSuccess = (
  email?: string,
  redirectUrl?: string
): IRegisterEmailSuccessAction => {
  return {
    payload: {
      email,
      redirectUrl,
    },
    type: Consts.REGISTER_EMAIL_SUCCESS,
  };
};

export const registerEmailFailure = (
  error?: IErrorModel,
  email?: string,
  redirectUrl?: string
): IRegisterEmailFailureAction => {
  return {
    error,
    payload: {
      email,
      redirectUrl,
    },
    type: Consts.REGISTER_EMAIL_FAILURE,
  };
};

export const registerConfirmEmail = (
  data: IRegisterConfirmEmailModel,
  redirectUrl?: string
): IRegisterConfirmEmailAction => {
  return {
    data,
    redirectUrl,
    type: Consts.REGISTER_CONFIRM_EMAIL,
  };
};

export const registerConfirmAccountWithPassword = (
  data: IConfirmAccountWithPasswordModel,
  redirectUrl?: string
): IConfirmAccountWithPasswordAction => {
  return {
    data,
    redirectUrl,
    type: Consts.CONFIRM_ACCOUNT_WITH_PASSWORD,
  };
};

export const registerConfirmEmailSuccess = (
  user?: IUserInfoModel,
  session?: ITokenModel,
  redirectUrl?: string
): IRegisterConfirmEmailSuccessAction => {
  return {
    payload: {
      user,
      session,
      redirectUrl,
    },
    type: Consts.REGISTER_CONFIRM_EMAIL_SUCCESS,
  };
};

export const registerConfirmEmailFailure = (
  error?: IErrorModel
): IRegisterConfirmEmailFailureAction => {
  return {
    error,
    type: Consts.REGISTER_CONFIRM_EMAIL_FAILURE,
  };
};

export const resendConfirmationEmailByUser = (
  data: IResendConfirmationByUserModel
): IResendConfirmationEmailByUserAction => {
  return {
    type: Consts.RESEND_CONFIRMATION_EMAIL_BY_USER,
    data: data,
  };
};

export const resendConfirmationEmailByUserSuccess =
  (): IResendConfirmationEmailByUserSuccessAction => {
    return {
      type: Consts.RESEND_CONFIRMATION_EMAIL_BY_USER_SUCCESS,
    };
  };

export const resendConfirmationEmailByUserFailure =
  (): IResendConfirmationEmailByUserFailureAction => {
    return {
      type: Consts.RESEND_CONFIRMATION_EMAIL_BY_USER_FAILURE,
    };
  };

export const Actions = {
  signIn,
  signInSuccess,
  signInAnonymous,
  signOut,
  setAuthenticated,
  changePassword,
  refreshUser,
  syncUser,
  syncUserSuccess,
  syncUserFailure,
  forgotPassword,
  resetForgotPassword,
  validateToken,
  refreshTokenSuccess,
  refreshTokenFailure,
  registerConfirmAccountWithPassword,
  registerConfirmEmail,
  registerEmail,
  resendConfirmationEmailByUser,
};
