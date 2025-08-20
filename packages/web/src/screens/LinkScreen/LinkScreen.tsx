/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ROUTES, useIsLoggedIn } from "@xala/common";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";

import { LoginCodeInput } from "components";
import { AuthScreen, IAuthScreenProps } from "screens/AuthScreen/AuthScreen";

export const LinkScreen = ({ configuration }: IAuthScreenProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    dispatch(replace(ROUTES.LOGIN, { from: ROUTES.LINK_SCREEN }));
    return null;
  }

  return (
    <AuthScreen configuration={configuration}>
      <LoginCodeInput />
    </AuthScreen>
  );
};
