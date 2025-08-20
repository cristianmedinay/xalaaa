/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { AppConfig, StorageHelper, useAnalyticsContext } from "@xala/common";
import React, { useEffect, useState } from "react";

import { LoginForm } from "../../../components/Forms/LoginForm";
import { AuthScreen, IAuthScreenProps } from "../AuthScreen";
import "../AuthScreen.scss";

type ILoginScreenProps = IAuthScreenProps;

export const LoginScreen = (props: ILoginScreenProps) => {
  const [apiVersion, setApiVersion] = useState("");

  const { signOn } = useAnalyticsContext();

  useEffect(() => {
    signOn();
    setBackendVersion();
  }, []);

  const setBackendVersion = async () => {
    const backendVer = await StorageHelper.getBackendVersion();
    setApiVersion(backendVer);
  };

  return (
    <>
      <AuthScreen {...props}>
        <LoginForm />
      </AuthScreen>
      {apiVersion && (
        <aside className="Version">
          <span>F:{AppConfig.PlatformVersion} / </span>
          <span> B:{apiVersion.replace(/"/g, "")}</span>
        </aside>
      )}
    </>
  );
};
