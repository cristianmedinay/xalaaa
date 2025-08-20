/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ConfigurationHelper,
  IAppState,
  IScreenModel,
  RouteHelper,
} from "@xala/common";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { match as RouterMatch } from "react-router";

import { AppFooter, AppHeader } from "../../components";
import { BaseScreen } from "../BaseScreen";

import "./MainScreen.scss";

interface IMainScreenProps {
  match: RouterMatch<{ id?: string }>;
}

export const MainScreen = ({ match }: IMainScreenProps) => {
  const [screenKey, setScreenKey] = useState(
    RouteHelper.getScreenRouteKey(match)
  );
  const configuration = useSelector(
    (state: IAppState) => state.configuration.configuration
  );

  useEffect(() => {
    const newScreenKey = RouteHelper.getScreenRouteKey(match);

    if (screenKey !== newScreenKey) {
      setScreenKey(newScreenKey);
    }
  }, [screenKey, match]);

  useEffect(() => {
    let script = document.getElementById(
      "webchatScript"
    ) as HTMLScriptElement | null;

    if (screenKey === "contacte") {
      if (!script) {
        const proto = document.location.protocol || "http:";
        script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src =
          proto +
          "//webchat-cls36-itx-mad.i6.inconcertcc.com/v3/click_to_chat?token=9E2D5498B79838A4E36C7BA6FFCE2C5A";
        script.async = true;
        script.id = "webchatScript";
        document.body.appendChild(script);
      }
    }

    return () => {
      if (
        !location.pathname.includes("profile") &&
        !location.pathname.includes("contacte")
      ) {
        const startButton = document.getElementById(
          "9E2D5498B79838A4E36C7BA6FFCE2C5A_startButtonContainer"
        );

        script && document.body.removeChild(script);
        startButton && document.body.removeChild(startButton);
      }
    };
  }, [screenKey]);

  if (!configuration || !configuration.Screens) {
    return null;
  }

  let screen: IScreenModel | undefined = undefined;

  if (screenKey) {
    screen = ConfigurationHelper.getScreenByRouteKey(configuration, screenKey);
  }

  if (!screen || screen.ScreenTypeCode === undefined) {
    return null;
  }

  return (
    <BaseScreen>
      {({ renderScreen }) => (
        <div className="MainScreen">
          <AppHeader configuration={configuration} />
          <section>{renderScreen(screen)}</section>
          <AppFooter />
        </div>
      )}
    </BaseScreen>
  );
};
