/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import { AppHeaderVisibility, RegisterSuccess } from "components";

import { AuthScreen, IAuthScreenProps } from "../AuthScreen";

type IRegisterSuccessScreenProps = IAuthScreenProps;

export const RegisterSuccessScreen = ({
  configuration,
}: IRegisterSuccessScreenProps) => {
  return (
    <AuthScreen
      configuration={configuration}
      visibility={AppHeaderVisibility.Menu}
    >
      <RegisterSuccess />
    </AuthScreen>
  );
};
