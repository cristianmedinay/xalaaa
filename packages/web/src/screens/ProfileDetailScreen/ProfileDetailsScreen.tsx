/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  dispatch,
  IAppState,
  IMediaSearchStateModel,
  IStateModel,
  IUserModel,
  IUserSettingsModel,
  MediaStore,
  RouteHelper,
  useConfigurationSelector,
  useIsLoggedIn,
  UserStore,
} from "@xala/common";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { AuthScreen } from "../AuthScreen";

import { ProfileDetails } from "./ProfileComponents/ProfileDetails";

export const ProfileDetailsScreen = () => {
  const isLoggedIn = useIsLoggedIn();
  const configuration = useConfigurationSelector();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(UserStore.Actions.getUserConsents());
      dispatch(UserStore.Actions.getProfile());
      dispatch(UserStore.Actions.getUserSettings());
      dispatch(
        MediaStore.Actions.searchMedia({
          PageNumber: 1,
          PageSize: 100,
          IncludeImages: true,
          Types: ["CHANNEL"],
        })
      );
    } else {
      RouteHelper.goToLogin();
    }
  }, [isLoggedIn]);

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

  const userFavoriteContents = useSelector<
    IAppState,
    IUserSettingsModel | undefined
  >((state) => state.user.settings as IUserSettingsModel);

  const userPersonalData = useSelector<
    IAppState,
    IStateModel<IUserModel> | undefined
  >((state) => state.user.profile);

  const mediaChannels = useSelector<IAppState, IMediaSearchStateModel>(
    (state) => state.media.mediaSearch
  );

  const favChannels = userFavoriteContents?.Channels;

  const favChannelIds = new Set(favChannels?.map((f) => f.Id));

  const channels = mediaChannels.Entities.filter((m) =>
    favChannelIds.has(m.Id)
  );

  return (
    <AuthScreen configuration={configuration} visibility={7}>
      <ProfileDetails
        fullName={userPersonalData?.Data?.FullName}
        email={userPersonalData?.Data?.Email}
        dateOfBirth={userPersonalData?.Data?.DateOfBirth}
        towns={userFavoriteContents?.Towns}
        categories={userFavoriteContents?.Categories}
        channels={channels}
        isLoading={mediaChannels.IsLoading && userPersonalData?.IsProcessing}
      />
    </AuthScreen>
  );
};
