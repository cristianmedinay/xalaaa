/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "@xala/common";
import { connect } from "react-redux";

import { AuthScreen as AuthScreenPresentational } from "./AuthScreen";
import { ConfirmAccountWithPasswordScreen as ConfirmAccountWithPasswordPresentational } from "./ConfirmAccountWithPasswordScreen";
import {
  ConfirmEmailScreen as ConfirmEmailScreenPresentational,
  ResendConfirmationSuccessScreen as ResendConfirmationSuccessScreenPresentational,
} from "./ConfirmEmailScreen";
import {
  ForgotPasswordScreen as ForgotPasswordScreenPresentational,
  ForgotPasswordSuccessScreen as ForgotPasswordSuccessScreenPresentational,
  ResetPasswordScreen as ResetPasswordScreenPresentational,
} from "./ForgotPasswordScreen";
import { LoginScreen as LoginScreenPresentational } from "./LoginScreen";
import {
  RegisterScreen as RegisterScreenPresentational,
  RegisterSuccessScreen as RegisterSuccessScreenPresentational,
} from "./RegisterScreen";

const mapStateToProps = (state: IAppState) => {
  return {
    configuration: state.configuration.configuration,
  };
};

export const AuthScreen = AuthScreenPresentational;
export const LoginScreen = connect(mapStateToProps)(LoginScreenPresentational);
export const RegisterScreen = connect(mapStateToProps)(
  RegisterScreenPresentational
);
export const RegisterSuccessScreen = connect(mapStateToProps)(
  RegisterSuccessScreenPresentational
);
export const ForgotPasswordScreen = connect(mapStateToProps)(
  ForgotPasswordScreenPresentational
);
export const ForgotPasswordSuccessScreen = connect(mapStateToProps)(
  ForgotPasswordSuccessScreenPresentational
);
export const ResetPasswordScreen = connect(mapStateToProps)(
  ResetPasswordScreenPresentational
);
export const ConfirmEmailScreen = connect(mapStateToProps)(
  ConfirmEmailScreenPresentational
);
export const ResendConfirmationSuccessScreen = connect(mapStateToProps)(
  ResendConfirmationSuccessScreenPresentational
);
export const ConfirmAccountWithPasswordScreen = connect(mapStateToProps)(
  ConfirmAccountWithPasswordPresentational
);
