/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

/* eslint-disable import/export */
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
  IResetPasswordLinkRequestModel,
  IResetPasswordLinkResponseModel,
  IResetPasswordModel,
  ISetPasswordModel,
  ITokenModel,
  IUserInfoModel,
  IUserModel,
} from "../../models";
import { IResendConfirmationByUserModel } from "../../providers/DataProvider/Internal/models";
import { IGetProductsSuccessAction } from "../user/types";

import * as Consts from "./consts";

export interface IAuthState {
  action?: AuthActionsTypes;
  user?: IUserInfoModel;
  session?: ITokenModel;
  error?: IErrorModel;
  isAuthenticated: boolean;
  isAnonymous: boolean;
  isLoading: boolean;
  isProcessing: boolean;
  isTokenValid?: boolean;
  changePasswordResult?: IAuthResponseModel;
}

export interface ISetAuthenticatedAction {
  type: typeof Consts.SET_AUTHENTICATED;
}

export interface IRefreshUserAction {
  type: typeof Consts.REFRESH_USER;
  payload: IUserModel;
}

export interface ISyncUserAction {
  type: typeof Consts.SYNC_USER;
}

export interface ISyncUserSuccessAction {
  type: typeof Consts.SYNC_USER_SUCCESS;
  payload: IUserInfoModel;
}

export interface ISyncUserFailureAction {
  type: typeof Consts.SYNC_USER_FAILURE;
}

export interface ISignOutAction {
  type: typeof Consts.SIGN_OUT;
  redirectUrl?: string;
}

export interface ISignOutSuccessAction {
  type: typeof Consts.SIGN_OUT_SUCCESS;
  redirectUrl?: string;
  anonymousUser?: IUserInfoModel;
}

export interface ISignOutFailureAction {
  type: typeof Consts.SIGN_OUT_FAILURE;
  error?: IErrorModel;
}

export interface IRefreshTokenSuccessAction {
  type: typeof Consts.REFRESH_TOKEN_SUCCESS;
  payload: {
    session: ITokenModel;
    user?: IUserInfoModel;
  };
}

export interface ISignInAction {
  type: typeof Consts.SIGN_IN;
  data: IAuthRequestModel;
}

export interface ISignInSuccessAction {
  type: typeof Consts.SIGN_IN_SUCCESS;
  payload: {
    user?: IUserInfoModel;
    session?: ITokenModel;
    didomiData?: IDidomiDataModel;
  };
}

export interface ISignInFailureAction {
  type: typeof Consts.SIGN_IN_FAILURE;
  error?: IErrorModel;
}

export interface ISignInAnonymousSuccessAction {
  type: typeof Consts.SIGN_IN_ANONYMOUS_SUCCESS;
  payload: {
    user?: IUserInfoModel;
    session?: ITokenModel;
    didomiData?: IDidomiDataModel;
  };
}

export interface ISignInAnonymousFailureAction {
  type: typeof Consts.SIGN_IN_ANONYMOUS_FAILURE;
  error?: IErrorModel;
}

export interface ISignInAnonymousAction {
  type: typeof Consts.SIGN_IN_ANONYMOUS;
  data: IAuthRequestModel;
}

export interface IRegisterEmailAction {
  type: typeof Consts.REGISTER_EMAIL;
  data: IRegisterRequestEmailModel;
  redirectUrl?: string;
}

export interface IRegisterEmailSuccessAction {
  type: typeof Consts.REGISTER_EMAIL_SUCCESS;
  payload: {
    email?: string;
    redirectUrl?: string;
  };
}

export interface IRegisterEmailFailureAction {
  type: typeof Consts.REGISTER_EMAIL_FAILURE;
  error?: IErrorModel;
  payload: {
    email?: string;
    redirectUrl?: string;
  };
}

export interface IRegisterConfirmEmailAction {
  type: typeof Consts.REGISTER_CONFIRM_EMAIL;
  data: IRegisterConfirmEmailModel;
  redirectUrl?: string;
}

export interface IConfirmAccountWithPasswordAction {
  type: typeof Consts.CONFIRM_ACCOUNT_WITH_PASSWORD;
  data: IConfirmAccountWithPasswordModel;
  redirectUrl?: string;
}

export interface IRegisterConfirmEmailSuccessAction {
  type: typeof Consts.REGISTER_CONFIRM_EMAIL_SUCCESS;
  payload: {
    user?: IUserInfoModel;
    session?: ITokenModel;
    redirectUrl?: string;
  };
}

export interface IRegisterConfirmEmailFailureAction {
  type: typeof Consts.REGISTER_CONFIRM_EMAIL_FAILURE;
  error?: IErrorModel;
}

export interface IRefreshTokenAction {
  type: typeof Consts.REFRESH_TOKEN;
}

export interface IRefreshTokenFailureAction {
  type: typeof Consts.REFRESH_TOKEN_FAILURE;
  error?: IErrorModel;
}

export interface ISetPasswordAction {
  type: typeof Consts.SET_PASSWORD;
  payload: ISetPasswordModel;
}

export interface ISetPasswordSuccessAction {
  type: typeof Consts.SET_PASSWORD_SUCCESS;
  payload: {
    session?: ITokenModel;
  };
}

export interface ISetPasswordFailureAction {
  type: typeof Consts.SET_PASSWORD_FAILURE;
  error?: IErrorModel;
}

export interface IResetPasswordAction {
  type: typeof Consts.RESET_PASSWORD;
  payload: IResetPasswordModel;
}

export interface IResetPasswordSuccessAction {
  type: typeof Consts.RESET_PASSWORD_SUCCESS;
  payload: boolean;
}

export interface IResetPasswordFailureAction {
  type: typeof Consts.RESET_PASSWORD_FAILURE;
  error?: IErrorModel;
}

export interface IChangePasswordAction {
  type: typeof Consts.CHANGE_PASSWORD;
  payload: IChangePasswordModel;
}

export interface IChangePasswordSuccessAction {
  type: typeof Consts.CHANGE_PASSWORD_SUCCESS;
  payload: IAuthResponseModel;
}

export interface IChangePasswordFailureAction {
  type: typeof Consts.CHANGE_PASSWORD_FAILURE;
  error?: IErrorModel;
}

export interface IValidateTokenAction {
  type: typeof Consts.VALIDATE_TOKEN;
  payload: {
    token: string;
  };
}

export interface IValidateTokenSuccessAction {
  type: typeof Consts.VALIDATE_TOKEN_SUCCESS;
}

export interface IValidateTokenFailureAction {
  type: typeof Consts.VALIDATE_TOKEN_FAILURE;
  error: IErrorModel;
}

export interface IForgotPasswordAction {
  type: typeof Consts.RESET_PASSWORD_LINK;
  payload: IForgotPasswordModel;
}

export interface IForgotPasswordSuccessAction {
  type: typeof Consts.RESET_PASSWORD_LINK_SUCCESS;
  payload: boolean;
}

export interface IForgotPasswordFailureAction {
  type: typeof Consts.RESET_PASSWORD_LINK_FAILURE;
  error?: IErrorModel;
  email?: string;
}

export interface IResetForgotPasswordAction {
  type: typeof Consts.RESET_PASSWORD;
  payload: IResetForgotPasswordModel;
}

export interface IResetForgotPasswordSuccessAction {
  type: typeof Consts.RESET_PASSWORD_SUCCESS;
  payload: boolean;
}

export interface IResetForgotPasswordFailureAction {
  type: typeof Consts.RESET_PASSWORD_FAILURE;
  error?: IErrorModel;
}

export interface IClearError {
  type: typeof Consts.CLEAR_ERROR;
}

export interface IResetPasswordLinkAction {
  type: typeof Consts.RESET_PASSWORD_LINK;
  data: IResetPasswordLinkRequestModel;
}

export interface IResetPasswordLinkSuccessAction {
  type: typeof Consts.RESET_PASSWORD_LINK_SUCCESS;
  payload: {
    response?: IResetPasswordLinkResponseModel;
  };
}

export interface IResetPasswordLinkFailureAction {
  type: typeof Consts.RESET_PASSWORD_LINK_FAILURE;
  error?: IErrorModel;
  email?: string;
}

export interface IConfirmAccountWithPasswordAction {
  type: typeof Consts.CONFIRM_ACCOUNT_WITH_PASSWORD;
  data: IConfirmAccountWithPasswordModel;
  redirectUrl?: string;
}

export interface IResendConfirmationEmailByUserAction {
  type: typeof Consts.RESEND_CONFIRMATION_EMAIL_BY_USER;
  data: IResendConfirmationByUserModel;
}

export interface IResendConfirmationEmailByUserSuccessAction {
  type: typeof Consts.RESEND_CONFIRMATION_EMAIL_BY_USER_SUCCESS;
}

export interface IResendConfirmationEmailByUserFailureAction {
  type: typeof Consts.RESEND_CONFIRMATION_EMAIL_BY_USER_FAILURE;
}

export type AuthActionsTypes =
  | ISetAuthenticatedAction
  | ISignInAction
  | ISignInSuccessAction
  | ISignInFailureAction
  | ISignInAnonymousAction
  | ISignInAnonymousSuccessAction
  | ISignInAnonymousFailureAction
  | ISignOutAction
  | ISignOutSuccessAction
  | ISignOutFailureAction
  | IRegisterEmailAction
  | IRegisterEmailSuccessAction
  | IRegisterEmailFailureAction
  | IRegisterConfirmEmailAction
  | IRegisterConfirmEmailSuccessAction
  | IRegisterConfirmEmailFailureAction
  | IRefreshTokenAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailureAction
  | IChangePasswordAction
  | IChangePasswordFailureAction
  | IChangePasswordSuccessAction
  | IRefreshUserAction
  | ISyncUserAction
  | ISyncUserSuccessAction
  | IForgotPasswordAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailureAction
  | IResetForgotPasswordAction
  | IResetForgotPasswordSuccessAction
  | IResetForgotPasswordFailureAction
  | IValidateTokenAction
  | IValidateTokenSuccessAction
  | IValidateTokenFailureAction
  | IResendConfirmationEmailByUserAction
  // not exacly auth action but used in auth reducers,
  // not putting it here would require to define it in multiple places
  | IGetProductsSuccessAction;
