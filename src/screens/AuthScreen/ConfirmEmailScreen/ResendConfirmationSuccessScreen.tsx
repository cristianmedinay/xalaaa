/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import { AppHeaderVisibility, ResendConfirmationSuccess } from "components";

import { AuthScreen, IAuthScreenProps } from "../AuthScreen";

type IResendConfirmationSuccessScreenProps = IAuthScreenProps;

export const ResendConfirmationSuccessScreen = ({
  configuration,
}: IResendConfirmationSuccessScreenProps) => {
  return (
    <AuthScreen
      configuration={configuration}
      visibility={AppHeaderVisibility.Menu}
    >
      <ResendConfirmationSuccess />
    </AuthScreen>
  );
};
