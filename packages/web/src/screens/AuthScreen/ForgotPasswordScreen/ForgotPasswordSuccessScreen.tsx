/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import { ForgotPasswordSuccess } from "../../../components/Forms";
import { AuthScreen, IAuthScreenProps } from "../AuthScreen";
import "../AuthScreen.scss";

type IForgotPasswordSuccessScreenProps = IAuthScreenProps;

export const ForgotPasswordSuccessScreen = (
  props: IForgotPasswordSuccessScreenProps
) => {
  return (
    <AuthScreen {...props}>
      <ForgotPasswordSuccess />
    </AuthScreen>
  );
};
