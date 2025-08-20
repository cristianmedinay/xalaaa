/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  IAppState,
  RouteHelper,
  useConfigurationSelector,
  useIsLoggedIn,
  UserStore,
} from "@xala/common";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LoaderSpinner, RegisterForm } from "components";
import { AuthScreen } from "screens/AuthScreen";

import "./EditFavoriteContentsComponent.scss";

export const EditFavoriteContentsComponent = () => {
  const dispatch = useDispatch();
  const configuration = useConfigurationSelector();
  const isLoggedIn = useIsLoggedIn();

  const { IsProcessing: IsLoadingProfile } = useSelector(
    (state: IAppState) => state.user.settings
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(UserStore.Actions.getUserConsents());
      dispatch(UserStore.Actions.getUserSettings());
    } else {
      RouteHelper.goToLogin();
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    let script = document.getElementById(
      "webchatScript"
    ) as HTMLScriptElement | null;

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
  }, []);

  return (
    <AuthScreen configuration={configuration} visibility={7}>
      <div className="EditFavoriteContentsContainer">
        {IsLoadingProfile ? <LoaderSpinner /> : <RegisterForm isEditScreen />}
      </div>
    </AuthScreen>
  );
};
