/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IFormValues, IRegisterRequestEmailModel } from "@xala/common";
import React, { useMemo } from "react";
import { RouteComponentProps, useParams } from "react-router";

import { AppHeaderVisibility, RegisterForm } from "components";

import { AuthScreen, IAuthScreenProps } from "../AuthScreen";

import { useEncryptedRegisterHash } from "./useEncryptedRegisterHash";

interface IRegisterScreenProps
  extends IAuthScreenProps,
    RouteComponentProps<
      Record<string, never>,
      Record<string, never>,
      IRegisterRequestEmailModel
    > {}

interface RegisterSearchParams {
  hash: string;
}

export const RegisterScreen = ({
  configuration,
  location,
}: IRegisterScreenProps) => {
  const { hash = "" } = useParams<RegisterSearchParams>();

  const { decryptedRegisterData } = useEncryptedRegisterHash({
    hash: decodeURIComponent(hash),
  });

  const initialValues = useMemo((): IFormValues | undefined => {
    if (decryptedRegisterData) {
      const { Email, FirstName, LastName } = decryptedRegisterData;

      return {
        email: Email,
        name: FirstName,
        surname: LastName,
      };
    }
    return location.state;
  }, [decryptedRegisterData, location.state]);

  return (
    <AuthScreen
      configuration={configuration}
      visibility={AppHeaderVisibility.Menu}
      isRegisterPage
    >
      <RegisterForm initialValues={initialValues} />
    </AuthScreen>
  );
};
