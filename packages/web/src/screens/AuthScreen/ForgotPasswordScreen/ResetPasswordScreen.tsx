/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";

import { ResetPasswordForm } from "../../../components/Forms";
import { AuthScreen, IAuthScreenProps } from "../AuthScreen";
import "../AuthScreen.scss";

import { IAppState, useAnalyticsContext, useSelector } from "@xala/common";

interface IResetPasswordScreenProps
  extends IAuthScreenProps,
    RouteComponentProps {}

export const ResetPasswordScreen = (props: IResetPasswordScreenProps) => {
  const { recoverPassword, validatePasswordRecovery } = useAnalyticsContext();

  const authState = useSelector((state: IAppState) => state.auth);
  const isTokenValid = authState.isTokenValid;

  useEffect(() => {
    recoverPassword();
  }, []);

  useEffect(() => {
    isTokenValid && validatePasswordRecovery();
  }, [isTokenValid]);

  return (
    <AuthScreen {...props}>
      <ResetPasswordForm {...props} />
    </AuthScreen>
  );
};
