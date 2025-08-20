/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IConfigurationModel, ThemeContext } from "@xala/common";
import React, { useContext } from "react";

import { AppFooter, AppHeader, AppHeaderVisibility } from "components";
import defaultImage from "resources/login-image.png";

import "./AuthScreen.scss";

export interface IAuthScreenProps {
  configuration?: IConfigurationModel;
  visibility?: AppHeaderVisibility;
  children?: React.ReactNode;
  isRegisterPage?: boolean;
}

export const AuthScreen = ({
  children,
  configuration,
  visibility,
  isRegisterPage,
}: IAuthScreenProps) => {
  const themeContext = useContext(ThemeContext);
  const defaultBackgroundImage = defaultImage;

  const backgroundImage = isRegisterPage
    ? themeContext.themeProvider.getAppRegisterImageUrl()
    : themeContext.themeProvider.getAppLoginImageUrl();

  return (
    <div className="AuthScreen">
      <AppHeader
        configuration={configuration}
        visibility={visibility || AppHeaderVisibility.Menu}
      />
      <div className="AuthScreen__container">
        <section className="AuthScreen__content">{children}</section>
        <div className="AuthScreen__image">
          <img
            src={`${backgroundImage}`}
            alt="registration background"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = defaultBackgroundImage;
            }}
          />
        </div>
      </div>
      <AppFooter />
    </div>
  );
};
