/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import { ForgotPasswordForm } from "../../../components/Forms";
import { AuthScreen, IAuthScreenProps } from "../AuthScreen";
import "../AuthScreen.scss";

type IForgotPasswordScreenProps = IAuthScreenProps;

export const ForgotPasswordScreen = (props: IForgotPasswordScreenProps) => {
  return (
    <AuthScreen {...props}>
      <div className="LoginScreen-container">
        <ForgotPasswordForm />
      </div>
    </AuthScreen>
  );
};
